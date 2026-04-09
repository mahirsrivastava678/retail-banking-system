package com.mahir.retailbanking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mahir.retailbanking.model.Loan;
import com.mahir.retailbanking.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/apply")
    public Loan applyLoan(@RequestBody Loan loan) {
        return loanService.applyLoan(loan);
    }

    @GetMapping("/all")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{accountNumber}")
    public List<Loan> getUserLoans(@PathVariable String accountNumber) {
        return loanService.getUserLoans(accountNumber);
    }

    @PutMapping("/approve/{id}")
    public Loan approveLoan(@PathVariable int id) {
        return loanService.approveLoan(id);
    }
}