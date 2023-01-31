package kr.tareun.ranchat.controller;

import kr.tareun.ranchat.model.dto.MemberDTO;
import kr.tareun.ranchat.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;

@RestController
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/doJoin")
    public void joinMember(MemberDTO member, HttpServletResponse response) throws IOException {
        memberService.joinMember(member);
        response.sendRedirect("http://localhost:8080/LoginForm");
    }

    @GetMapping("/getIsValidEmail")
    public boolean getIsValidEmail(String username){
        return memberService.getIsValidEmail(username);
    }

    @GetMapping("/getLoginMember")
    public String getMember(Principal principal, HttpSession session){
        if (principal == null){
            return "Guest"+session.getId();
        }
        return principal.getName();
    }

    @GetMapping("/getCsrfTk")
    public String getToken(CsrfToken csrfToken){
        return csrfToken.getToken();
    }

}
