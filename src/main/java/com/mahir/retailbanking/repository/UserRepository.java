package com.mahir.retailbanking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mahir.retailbanking.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}