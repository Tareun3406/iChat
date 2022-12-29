package kr.tareun.ranchat.service;

import kr.tareun.ranchat.model.entitiy.Member;
import kr.tareun.ranchat.model.vo.MemberLoginVO;
import kr.tareun.ranchat.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository repository;

    @Autowired
    public MemberDetailsService(MemberRepository repository){
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> result =  repository.findById(username);
        Member user;

        if (result.isPresent()){
            user = result.get();
        }else{
            throw new UsernameNotFoundException("회원 정보를 찾을 수 없습니다.");
        }
        return new MemberLoginVO(user);
    }
}
