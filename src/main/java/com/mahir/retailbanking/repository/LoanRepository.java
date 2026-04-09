package com.mahir.retailbanking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mahir.retailbanking.model.Loan;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
    List<Loan> findByAccountNumber(String accountNumber);
}