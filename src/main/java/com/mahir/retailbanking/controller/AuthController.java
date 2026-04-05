package com.mahir.retailbanking.controller;

import com.mahir.retailbanking.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestParam String email) {
        return jwtUtil.generateToken(email);
    }
}