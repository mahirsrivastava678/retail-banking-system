package com.mahir.retailbanking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/**",
                                "/api/register",
                                "/api/login",
                                "/api/balance/**",
                                "/api/deposit/**",
                                "/api/withdraw/**",
                                "/api/transfer/**",
                                "/api/transactions/**",
                                "/api/admin/**",
                                "/api/loan/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}