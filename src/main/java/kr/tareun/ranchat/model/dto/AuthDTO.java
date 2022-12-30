package kr.tareun.ranchat.model.dto;

import kr.tareun.ranchat.model.entitiy.Auth;
import kr.tareun.ranchat.model.entitiy.AuthColumn;
import kr.tareun.ranchat.model.entitiy.Member;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthDTO {

    private String auth;
    private String username;

    public Auth toEntity(Member member){
        return Auth.builder()
                .authColumn(new AuthColumn(auth, username))
                .member(member)
                .build();
    }
}
