package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mahir.retailbanking.service.AccountService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/balance/{accountNumber}")
    public double getBalance(@PathVariable String accountNumber) {
        return accountService.getBalance(accountNumber);
    }

    @PutMapping("/deposit/{accountNumber}/{amount}")
    public String deposit(@PathVariable String accountNumber,
                          @PathVariable double amount) {
        accountService.deposit(accountNumber, amount);
        return "Deposit Success";
    }

    @PutMapping("/withdraw/{accountNumber}/{amount}")
    public String withdraw(@PathVariable String accountNumber,
                           @PathVariable double amount) {
        accountService.withdraw(accountNumber, amount);
        return "Withdraw Success";
    }

    @PutMapping("/transfer/{fromAccount}/{toAccount}/{amount}")
    public String transfer(@PathVariable String fromAccount,
                           @PathVariable String toAccount,
                           @PathVariable double amount) {
        return accountService.transfer(fromAccount, toAccount, amount);
    }
}