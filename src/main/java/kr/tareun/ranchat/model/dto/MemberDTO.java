package kr.tareun.ranchat.model.dto;

import kr.tareun.ranchat.model.entitiy.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
@Setter
public class MemberDTO {

    private String username;
    private String nickname;
    private String password;
    private boolean isCertified;
    private String uid;

    public Member toEntity() {
        return Member.builder()
                .username(username)
                .password(password)
                .nickname(nickname)
                .isCertified(isCertified)
                .build();
    }
}
