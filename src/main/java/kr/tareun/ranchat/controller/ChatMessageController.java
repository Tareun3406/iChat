package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.domain.vo.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatMessageController {
    private final SimpMessagingTemplate template;

    @Autowired
    public ChatMessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/chat/join")
    public void join(ChatMessage message){
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessage message){
        System.out.println(message);
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }
}
