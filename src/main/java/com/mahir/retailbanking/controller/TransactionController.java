package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mahir.retailbanking.model.Transaction;
import com.mahir.retailbanking.service.TransactionService;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/")
    public Transaction saveTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    // Unique path for account transactions
    @GetMapping("/account/{accountNumber}")
    public List<Transaction> getTransactionsByAccount(@PathVariable String accountNumber) {
        return transactionService.getTransactions(accountNumber);
    }
}