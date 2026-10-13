package com.regalo.jardin_para_ti.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JardinController {

    @GetMapping("/")
    public String inicio() {
        return "index";
    }
}
