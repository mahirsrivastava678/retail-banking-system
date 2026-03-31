package com.mahir.retailbanking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "account")   // ✅ Table ka naam specify karo agar DB me "account" hai
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")   // DB column name
    private int id;

    @Column(name = "user_id")   // DB column name
    private int userId;

    @Column(name = "account_no")   // DB column name
    private String accountNo;

    @Column(name = "balance")   // DB column name
    private String balance;
    // ✅ Default constructor (Hibernate ke liye mandatory)
    public Account() {}

    // ✅ Parameterized constructor
    public Account(int id, int userId, String accountNo, String balance) {
        this.id = id;
        this.userId = userId;
        this.accountNo = accountNo;
        this.balance = balance;
    }

    // ✅ Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getAccountNo() { return accountNo; }
    public void setAccountNo(String accountNo) { this.accountNo = accountNo; }

    public String getBalance() { return balance; }
    public void setBalance(String balance) { this.balance = balance; }
}
