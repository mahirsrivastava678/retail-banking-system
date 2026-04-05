package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.service.UserService;
import com.mahir.retailbanking.security.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        if (user.getEmail() == null || user.getPassword() == null ||
                user.getEmail().isEmpty() || user.getPassword().isEmpty()) {
            return "Login Failed";
        }

        String result = userService.loginUser(user);

        if (result.equals("Login Successful")) {
            return jwtUtil.generateToken(user.getEmail());
        } else {
            return "Login Failed";
        }
    }


    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}