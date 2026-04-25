package com.mahir.retailbanking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.model.Account;
import com.mahir.retailbanking.repository.UserRepository;
import com.mahir.retailbanking.repository.AccountRepository;

import java.util.List;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    // REGISTER
    public User registerUser(User user) {

        String accountNumber = "ACC" + (100000 + new Random().nextInt(900000));

        user.setAccountNumber(accountNumber);

        User savedUser = userRepository.save(user);

        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setBalance(0);

        accountRepository.save(account);

        return savedUser;
    }

    // LOGIN
    public User loginUser(User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }

        return null;
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // =========================
    // PROFILE FEATURE START
    // =========================

    // GET USER BY ACCOUNT NUMBER
    public User getUserByAccountNumber(String accountNumber) {
        return userRepository.findByAccountNumber(accountNumber);
    }

    // UPDATE PROFILE
    public User updateProfile(User user) {

        User existing = userRepository.findByAccountNumber(user.getAccountNumber());

        if (existing != null) {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setPassword(user.getPassword());

            return userRepository.save(existing);
        }

        return null;
    }
}