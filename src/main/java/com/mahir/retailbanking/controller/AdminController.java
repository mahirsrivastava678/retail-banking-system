package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.mahir.retailbanking.model.User;
import com.mahir.retailbanking.model.Account;
import com.mahir.retailbanking.model.Transaction;
import com.mahir.retailbanking.repository.UserRepository;
import com.mahir.retailbanking.repository.AccountRepository;
import com.mahir.retailbanking.repository.TransactionRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
        return "User Deleted";
    }
}