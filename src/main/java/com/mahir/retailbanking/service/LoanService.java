package com.mahir.retailbanking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mahir.retailbanking.model.Loan;
import com.mahir.retailbanking.model.Account;
import com.mahir.retailbanking.repository.LoanRepository;
import com.mahir.retailbanking.repository.AccountRepository;

import java.util.List;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AccountRepository accountRepository;

    public Loan applyLoan(Loan loan) {
        loan.setStatus("Pending");
        return loanRepository.save(loan);
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public List<Loan> getUserLoans(String accountNumber) {
        return loanRepository.findByAccountNumber(accountNumber);
    }

    public Loan approveLoan(int id) {
        Loan loan = loanRepository.findById(id).orElse(null);

        if (loan != null && loan.getStatus().equals("Pending")) {

            Account account = accountRepository.findByAccountNumber(loan.getAccountNumber());

            if (account != null) {
                account.setBalance(account.getBalance() + loan.getAmount());
                accountRepository.save(account);
            }

            loan.setStatus("Approved");
            return loanRepository.save(loan);
        }

        return null;
    }
}