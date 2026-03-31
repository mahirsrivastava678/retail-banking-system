package com.mahir.retailbanking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.repository.UserRepository;

import java.util.List;  // ✅ Needed for List<User>

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
