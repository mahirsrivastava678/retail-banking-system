package com.mahir.retailbanking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String accountNumber;
    private String type;
    private double amount;
    private LocalDateTime time;

    public Transaction() {}

    public Transaction(String accountNumber, String type, double amount) {
        this.accountNumber = accountNumber;
        this.type = type;
        this.amount = amount;
        this.time = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}