package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.service.UserService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{accountNumber}")
    public User getProfile(@PathVariable String accountNumber) {
        return userService.getUserByAccountNumber(accountNumber);
    }

    @PutMapping("/update")
    public User updateProfile(@RequestBody User user) {
        return userService.updateProfile(user);
    }
}