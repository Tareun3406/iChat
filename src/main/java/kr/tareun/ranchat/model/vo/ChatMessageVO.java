package kr.tareun.ranchat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.awt.*;

@Getter
@AllArgsConstructor
public class ChatMessageVO {
    private String roomId;
    private String message;
    private TrayIcon.MessageType type;
}
