package kr.tareun.ranchat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatMessageVO {
    private String roomId;
    private String message;
    private String writer;
    private String type;    // memberIn, memberOut, system, message 중 하나로 받을것
}
