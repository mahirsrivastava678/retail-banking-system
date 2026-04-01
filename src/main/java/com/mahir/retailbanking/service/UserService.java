package com.mahir.retailbanking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.repository.UserRepository;

import java.util.List;  // ✅ Needed for List<User>

@Service
public class UserService {
    public String loginUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return "Login Successful";
        } else {
            return "Invalid Email or Password";
        }
    }

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
