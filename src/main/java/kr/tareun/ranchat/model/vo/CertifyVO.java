package kr.tareun.ranchat.model.vo;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CertifyVO {

    private String username;
    private String uid;
    private String type;
    private LocalDateTime insDate;

    public CertifyVO(String username, String uid, String type, LocalDateTime insDate) {
        this.username = username;
        this.uid = uid;
        this.type = type;
        this.insDate = insDate;
    }
}
