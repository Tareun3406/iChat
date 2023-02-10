package kr.tareun.ranchat.model.vo;

import kr.tareun.ranchat.model.entitiy.Member;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;


@Getter
@EqualsAndHashCode
public class MemberLoginVO implements UserDetails {
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> auths;
    private boolean isCertified = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return auths;
    }

    public MemberLoginVO(Member entity){
        username = entity.getUsername();
        password = entity.getPassword();
        auths = entity.getAuths();
        isCertified = entity.isCertified();
        System.out.println(isCertified);
    }

    @Override
    public boolean isAccountNonExpired() {
        System.out.println(isCertified);
        return isCertified;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isCertified;
    }
}
