package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatMessageController {

    private final SimpMessagingTemplate template;
    private final ChatRoomRepository roomRepository;

    @Autowired
    public ChatMessageController(SimpMessagingTemplate template, ChatRoomRepository roomRepository) {
        this.template = template;
        this.roomRepository = roomRepository;
    }

    @MessageMapping("/chat/join")
    public void join(ChatMessageVO message){
        roomRepository.joinRoom(message);
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }

    @MessageMapping("/chat/out")
    public void out(ChatMessageVO message){
        roomRepository.outRoom(message);
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageVO message){
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }
}
