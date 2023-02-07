package kr.tareun.ranchat.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.mail.SimpleMailMessage;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailDTO {

    private String senderMail;  // 발신 이메일 주소
    private String mailTitle;   // 메일 제목
    private String message;     // 메일 내용
    private String email;       // 받을 이메일

    public SimpleMailMessage ToSMM(){
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom(senderMail);
        smm.setSubject(mailTitle);
        smm.setText(message);
        smm.setTo(email);
        return smm;
    }
}
