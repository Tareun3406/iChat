package kr.tareun.ranchat.model.dto;

import kr.tareun.ranchat.model.entitiy.CertifyUID;
import kr.tareun.ranchat.model.entitiy.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CertifyDTO {
    private String username;    // 폼에서 아이디를 받을때만 사용.
    private String uid;
    private String type;
    private LocalDateTime insDate;

    private String password;
    private Member member;

    public static CertifyDTO entityToDTO(CertifyUID certifyUID){
        CertifyDTO result = new CertifyDTO();
        result.member = certifyUID.getUsername();
        result.username = certifyUID.getUsername().getUsername();
        result.uid = certifyUID.getUid();
        result.type = certifyUID.getType();
        result.insDate = certifyUID.getInsDate();
        return result;
    }
    public CertifyUID toCertifyUID(){
        return CertifyUID.builder().username(member).uid(uid).type(type).insDate(insDate).build();
    }
    public Member usernameToMember(){
        return Member.builder().username(username).build();
    }
}
