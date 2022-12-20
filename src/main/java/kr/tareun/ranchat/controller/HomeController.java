package kr.tareun.ranchat.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HomeController {

    @RequestMapping("/")
    public ModelAndView indexPageView(){
        ModelAndView mv = new ModelAndView("index");
        mv.addObject("data","hello index");
        return mv;
    }

    @GetMapping("/lobby")
    public ModelAndView robbyView(){
        ModelAndView mv = new ModelAndView("chat/lobby");
        return mv;
    }


    //@PostMapping      Create
    //@GetMapping       Read
    //@PutMapping       Update
    //@DeleteMapping    Delete
}
