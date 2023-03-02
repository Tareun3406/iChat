package kr.tareun.ranchat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @GetMapping(value = {"/","/RanChat", "/LoginForm", "JoinForm", "SearchPW", "ChangePw"})
    public String view(){
        return "forward:/index.html";
    }
}
