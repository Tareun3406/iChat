package kr.tareun.ranchat.model.entitiy;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Member implements Serializable {

    @Id
    @Column(length = 100)
    private String username;

    @Column(length = 200, nullable = false)
    private String password;

    @OneToMany(mappedBy = "member")
    private List<Auth> auths;
}
