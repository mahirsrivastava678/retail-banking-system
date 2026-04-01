package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mahir.retailbanking.model.Account;
import com.mahir.retailbanking.service.AccountService;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/account")
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }
}