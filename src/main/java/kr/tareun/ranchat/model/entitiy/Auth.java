package kr.tareun.ranchat.model.entitiy;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Auth implements GrantedAuthority {

    @EmbeddedId // Auth 테이블의 레코드가 composite primary key 로 적용. 정규화
    protected AuthColumn authColumn;

    @MapsId("username")
    @ManyToOne()
    @JoinColumn(name="username")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Override
    public String getAuthority() {
        return authColumn.auth;
    }
}
