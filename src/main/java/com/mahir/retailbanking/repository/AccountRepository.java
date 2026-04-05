package com.mahir.retailbanking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mahir.retailbanking.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByAccountNumber(String accountNumber);
}