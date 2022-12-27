package kr.tareun.ranchat.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AuthColumn implements Serializable {

    String auth;
    String username;

}
