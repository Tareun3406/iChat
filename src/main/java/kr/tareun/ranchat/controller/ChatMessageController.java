package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.service.ChatRoomService;
import kr.tareun.ranchat.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatMessageController {

    private final SimpMessagingTemplate template;
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

    @Autowired
    public ChatMessageController(SimpMessagingTemplate template, ChatRoomService chatRoomService, MemberService memberService) {
        this.template = template;
        this.chatRoomService = chatRoomService;
        this.memberService = memberService;
    }

    // 입장 메시지 수신시
    @MessageMapping("/chat/join")
    public void join(ChatMessageVO message){
        chatRoomService.joinRoom(message);
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }

    // 퇴장 메시지 수신시
    @MessageMapping("/chat/out")
    public void out(ChatMessageVO message){
        chatRoomService.outRoom(message);
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageVO message){
        template.convertAndSend("/subscript/chat/room/"+message.getRoomId(),message);
    }
}
