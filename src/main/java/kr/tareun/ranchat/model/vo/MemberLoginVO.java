package kr.tareun.ranchat.model.vo;

import kr.tareun.ranchat.model.entitiy.Member;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
public class MemberLoginVO implements UserDetails {
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> auths;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return auths;
    }

    public MemberLoginVO(Member entity){
        username = entity.getUsername();
        password = entity.getPassword();
        auths = entity.getAuths();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
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
        return true;
    }
}
