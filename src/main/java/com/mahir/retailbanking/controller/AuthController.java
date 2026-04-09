package com.mahir.retailbanking.controller;

import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.repository.UserRepository;
import com.mahir.retailbanking.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        Map<String, String> response = new HashMap<>();

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {

            String token = jwtUtil.generateToken(existingUser.getEmail());

            response.put("token", token);
            response.put("accountNumber", existingUser.getAccountNumber());
            response.put("userName", existingUser.getName());

            return response;
        }

        response.put("message", "Login Failed");
        return response;
    }
}