package kr.tareun.ranchat.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class CertifyUID{

    @OneToOne
    @JoinColumn(name = "username")
    private Member username;

    @Id
    private String uid;

    private String type;    // "Certify" , "findPw"등 용도 설정

    @CreationTimestamp
    @Column(name = "date")
    private LocalDateTime insDate; // 유효시간 체크용 date;
}
