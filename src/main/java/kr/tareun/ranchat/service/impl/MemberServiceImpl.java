package kr.tareun.ranchat.service.impl;

import kr.tareun.ranchat.model.dto.AuthDTO;
import kr.tareun.ranchat.model.dto.EmailDTO;
import kr.tareun.ranchat.model.dto.MemberDTO;
import kr.tareun.ranchat.model.entitiy.Auth;
import kr.tareun.ranchat.model.entitiy.Member;
import kr.tareun.ranchat.repository.AuthRepository;
import kr.tareun.ranchat.repository.MemberRepository;
import kr.tareun.ranchat.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;


@Service
public class MemberServiceImpl implements MemberService {

    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final AuthRepository authRepository;

    @Autowired
    public MemberServiceImpl(JavaMailSender mailSender, MemberRepository memberRepository
            , BCryptPasswordEncoder passwordEncoder, AuthRepository authRepository) {
        this.mailSender = mailSender;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authRepository = authRepository;
    }

    @Transactional
    @Override
    public void joinMember(MemberDTO member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        Member memberEntity = member.toEntity();
        AuthDTO auth = new AuthDTO("USER", memberEntity.getUsername());
        Auth authEntity = auth.toEntity(memberEntity);

        memberRepository.save(memberEntity);
        authRepository.save(authEntity);
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
                "아래 링크를 통해 비밀번호를 변경해주세요.\n http://localhost:3000/linkPwFind?uid="+uid,
                username
        );
        mailSender.send(mailCont.ToSMM());
        return true;
    }

}
