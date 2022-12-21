package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.vo.ChatRoomVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RanChatController {

    @GetMapping("/ranChat")
    public ModelAndView ranChatRoom(){
        ModelAndView mv = new ModelAndView("/chat/random");
        mv.addObject("chatRoom", new ChatRoomVO());
        return mv;
    }

}
