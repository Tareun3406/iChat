package kr.tareun.ranchat.model.dto;

import kr.tareun.ranchat.model.entitiy.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class MemberDTO {

    private String username;
    private String nickname;
    private String password;

    public Member toEntity() {
        return Member.builder()
                .username(username)
                .password(password)
                .nickname(nickname)
                .build();
    }
}
