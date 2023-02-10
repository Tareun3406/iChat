package kr.tareun.ranchat.model.entitiy;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Member{

    @Id
    @Column(length = 100)
    private String username;

    @Column(length = 20)
    private String nickname;

    @Column(length = 200, nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean isCertified;    // 이메일 인증 유무 인증 완료시 true

    @OneToMany(mappedBy = "member")
    private List<Auth> auths;

    public void setCertified(boolean isCertified){
        this.isCertified = isCertified;
    }
}
