package kr.tareun.ranchat.service.impl;

import kr.tareun.ranchat.model.dto.AuthDTO;
import kr.tareun.ranchat.model.dto.CertifyDTO;
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
        member.setCertified(true);          // 이메일 인증 확인 유무, true=인증됨
        Member memberEntity = member.toEntity();
        AuthDTO auth = new AuthDTO("USER", memberEntity.getUsername());
        Auth authEntity = auth.toEntity(memberEntity);
        String uid = UUID.randomUUID().toString();
        memberRepository.save(memberEntity);
        authRepository.save(authEntity);
        certifyUIDRepository.save(CertifyUID.builder().username(memberEntity)
                                    .uid(uid).insDate(LocalDateTime.now()).build());

//        // 이메일 전송
//        EmailDTO mailCont = new EmailDTO(
//                "tareun3406@gmail.com",
//                "아이톡 이메일 인증",
//                "아래 링크를 통해 이메일을 인증해주세요." +
//                        "\n http://ranchat.kr/EmailCertify" +
//                        "?username="+member.getUsername()+
//                        "&uid="+uid,
//                member.getUsername()
//        );
//        mailSender.send(mailCont.ToSMM());
    }

    @Override
    public MemberDTO getMemberInfo(String username) {
        Optional<Member> optional = memberRepository.findById(username);
        return optional.map(Member::toDTO).orElse(null);
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
    public boolean sendFindPwMail(MemberDTO member) {
        String uid = UUID.randomUUID().toString();
        CertifyUID certifyUID = CertifyUID.builder().username(member.toEntity()).uid(uid).type("PW_FIND").build();
        EmailDTO mailCont = new EmailDTO(
                "tareun3406@gmail.com",
                "아이톡 비밀번호 찾기",
                "아래 링크를 통해 비밀번호를 변경해주세요.\n http://ranchat.kr/ChangePw?username="+member.getUsername()+"&uid="+uid,
                member.getUsername() //메일을 받을 대상 이메일
        );
        certifyUIDRepository.save(certifyUID);
        mailSender.send(mailCont.ToSMM());
        return true;
    }

    @Transactional
    @Override
    public int updatePw(String username, String pw) {
        return memberRepository.updatePassword(username, passwordEncoder.encode(pw));
    }

    @Override
    public CertifyDTO getCertify(String uid) {
        Optional<CertifyUID> optional = certifyUIDRepository.findById(uid);
        return optional.map(CertifyDTO::entityToDTO).orElse(null);  // 테이블에서 정보를 찾지 못했을 경우 null 리턴.
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
