package com.mahir.retailbanking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mahir.retailbanking.model.Account;
import com.mahir.retailbanking.model.Transaction;
import com.mahir.retailbanking.repository.AccountRepository;
import com.mahir.retailbanking.repository.TransactionRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account deposit(String accountNumber, double amount) {
        Account account = accountRepository.findByAccountNumber(accountNumber);

        if (account == null) {
            throw new RuntimeException("Account not found");
        }

        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);

        Transaction transaction = new Transaction(accountNumber, "Deposit", amount);
        transactionRepository.save(transaction);

        return account;
    }

    public Account withdraw(String accountNumber, double amount) {
        Account account = accountRepository.findByAccountNumber(accountNumber);

        if (account == null) {
            throw new RuntimeException("Account not found");
        }

        if (account.getBalance() >= amount) {
            account.setBalance(account.getBalance() - amount);
            accountRepository.save(account);

            Transaction transaction = new Transaction(accountNumber, "Withdraw", amount);
            transactionRepository.save(transaction);

            return account;
        } else {
            throw new RuntimeException("Insufficient Balance");
        }
    }

    public String transfer(String fromAccount, String toAccount, double amount) {

        Account sender = accountRepository.findByAccountNumber(fromAccount);
        Account receiver = accountRepository.findByAccountNumber(toAccount);

        if (sender == null || receiver == null) {
            return "Account not found";
        }

        if (sender.getBalance() >= amount) {
            sender.setBalance(sender.getBalance() - amount);
            receiver.setBalance(receiver.getBalance() + amount);

            accountRepository.save(sender);
            accountRepository.save(receiver);

            transactionRepository.save(new Transaction(fromAccount, "Transfer Sent", amount));
            transactionRepository.save(new Transaction(toAccount, "Transfer Received", amount));

            return "Transfer Successful";
        } else {
            return "Insufficient Balance";
        }
    }
    public double checkBalance(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber);

        if (account == null) {
            throw new RuntimeException("Account not found");
        }

        return account.getBalance();
    }

    public Account getAccount(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber);

        if (account == null) {
            throw new RuntimeException("Account not found");
        }

        return account;
    }
    public java.util.List<Transaction> getTransactions(String accountNumber) {
        return transactionRepository.findByAccountNumber(accountNumber);
    }
}