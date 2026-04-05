package com.mahir.retailbanking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mahir.retailbanking.model.Transaction;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByAccountNumber(String accountNumber);
}