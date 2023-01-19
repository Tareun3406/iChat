package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.vo.ChatRoomVO;
import kr.tareun.ranchat.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RanChatController {

    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public RanChatController(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    @GetMapping("/ranChat")
    public ModelAndView ranChatRoom(@RequestParam(required = false, value = "id") String id){
        ModelAndView mv = new ModelAndView("/chat/random");
        ChatRoomVO room = chatRoomRepository.matchRoom();
        mv.addObject("room",room);
        mv.addObject("userId",id);
        return mv;
    }

    @GetMapping("/ranChatTest")
    public ChatRoomVO ranChatRoomTest(){
        ChatRoomVO room = chatRoomRepository.matchRoom();
        return room;
    }

    @GetMapping("/getRoomInfo")
    public ChatRoomVO getRoomInfo(String roomId){
        ChatRoomVO room = chatRoomRepository.getRoomInfo(roomId);
        return room;
    }

}
