package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
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
    public void join(ChatMessageVO message){
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageVO message){
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }
}
