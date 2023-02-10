package kr.tareun.ranchat.service.impl;

import kr.tareun.ranchat.model.dto.AuthDTO;
import kr.tareun.ranchat.model.dto.EmailDTO;
import kr.tareun.ranchat.model.dto.MemberDTO;
import kr.tareun.ranchat.model.entitiy.Auth;
import kr.tareun.ranchat.model.entitiy.CertifyUID;
import kr.tareun.ranchat.model.entitiy.Member;
import kr.tareun.ranchat.repository.AuthRepository;
import kr.tareun.ranchat.repository.CertifyUIDRepository;
import kr.tareun.ranchat.repository.MemberRepository;
import kr.tareun.ranchat.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


@Service
public class MemberServiceImpl implements MemberService {

    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final AuthRepository authRepository;
    private final CertifyUIDRepository certifyUIDRepository;

    @Autowired
    public MemberServiceImpl(JavaMailSender mailSender, MemberRepository memberRepository
            , BCryptPasswordEncoder passwordEncoder, AuthRepository authRepository, CertifyUIDRepository certifyUIDRepository) {
        this.mailSender = mailSender;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authRepository = authRepository;
        this.certifyUIDRepository = certifyUIDRepository;
    }

    @Transactional
    @Override
    public void joinMember(MemberDTO member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setCertified(false);
        Member memberEntity = member.toEntity();
        AuthDTO auth = new AuthDTO("USER", memberEntity.getUsername());
        Auth authEntity = auth.toEntity(memberEntity);
        String uid = UUID.randomUUID().toString();
        memberRepository.save(memberEntity);
        authRepository.save(authEntity);
        certifyUIDRepository.save(CertifyUID.builder().username(memberEntity)
                                    .uid(uid).insDate(LocalDateTime.now()).build());

        // 이메일 전송
        EmailDTO mailCont = new EmailDTO(
                "tareun3406@gmail.com",
                "아이톡 이메일 인증",
                "아래 링크를 통해 이메일을 인증해주세요." +
                        "\n http://localhost:3000/EmailCertify" +
                        "?username="+member.getUsername()+
                        "&uid="+uid,
                member.getUsername()
        );
        mailSender.send(mailCont.ToSMM());
    }

    @Override
    public String getMemberNickname(String username) {
        Optional<Member> optional = memberRepository.findById(username);
        if(optional.isPresent()) return optional.get().getNickname();
        else return "익명";
    }

    @Override
    public boolean getIsInValidEmail(String username) {
        Optional<Member> optional = memberRepository.findById(username);
        return optional.isPresent();
    }

    @Transactional
    @Override
    public boolean sendFindPwMail(String username) {
        String uid = UUID.randomUUID().toString();
        EmailDTO mailCont = new EmailDTO(
                "tareun3406@gmail.com",
                "아이톡 비밀번호 찾기",
                "아래 링크를 통해 비밀번호를 변경해주세요.\n http://localhost:3000/linkPwFind?username="+username+"&uid="+uid,
                username //메일을 받을 대상 이메일
        );
        mailSender.send(mailCont.ToSMM());
        return true;
    }

    @Override
    public void emailCertify(String username, String uid) {
        Optional<CertifyUID> op = certifyUIDRepository.findById(uid);
        CertifyUID certifyUID;
        if (op.isPresent()){
            certifyUID = op.get();
            if (certifyUID.getUid().equals(uid)
                    && certifyUID.getInsDate().plusMinutes(300L).isAfter(LocalDateTime.now())){ // 유효시간 30분
                Member member = certifyUID.getUsername();
                member.setCertified(true);
                memberRepository.save(member);
                certifyUIDRepository.delete(certifyUID);
            }
        }
    }

}
