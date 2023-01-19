package kr.tareun.ranchat.service.impl;

import kr.tareun.ranchat.model.dto.AuthDTO;
import kr.tareun.ranchat.model.dto.MemberDTO;
import kr.tareun.ranchat.model.entitiy.Auth;
import kr.tareun.ranchat.model.entitiy.Member;
import kr.tareun.ranchat.repository.AuthRepository;
import kr.tareun.ranchat.repository.MemberRepository;
import kr.tareun.ranchat.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class MemberServiceImpl implements MemberService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final AuthRepository authRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository
            , BCryptPasswordEncoder passwordEncoder, AuthRepository authRepository) {
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
        else return username;
    }
}
