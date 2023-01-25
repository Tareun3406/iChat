package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.dto.MemberDTO;
import kr.tareun.ranchat.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@RestController
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/join")
    public ModelAndView joinFormView(){
        return new ModelAndView("member/joinForm");
    }

    @PostMapping("/join")
    public String joinMember(MemberDTO member){
        memberService.joinMember(member);
        return null;
    }

    @GetMapping("/getMember")
    public String getMember(Principal principal, HttpSession session){
        if (principal == null){
            return "Guest"+session.getId();
        }
        return principal.getName();
    }

}
