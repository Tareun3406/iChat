package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.vo.ChatRoomVO;
import kr.tareun.ranchat.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RanChatController {

    private final ChatRoomService chatRoomService;

    @Autowired
    public RanChatController(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    // 방 매칭
    @GetMapping("/matchRanChat")
    public ChatRoomVO ranChatRoomTest(){
        return chatRoomService.matchRoom();
    }

    // 방 정보
    @GetMapping("/getRoomInfo")
    public ChatRoomVO getRoomInfo(String roomId){
        return chatRoomService.getRoomInfo(roomId);
    }

}
