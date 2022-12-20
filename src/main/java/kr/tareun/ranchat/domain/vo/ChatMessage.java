package kr.tareun.ranchat.domain.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.awt.*;

@Getter
@Setter
@ToString
public class ChatMessage {
    private String roomId;
    private String message;
    private TrayIcon.MessageType type;
}
