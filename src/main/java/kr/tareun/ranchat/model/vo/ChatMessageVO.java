package kr.tareun.ranchat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatMessageVO {
    private String roomId;
    private String message;
    private String writer;
}
