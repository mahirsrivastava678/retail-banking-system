package com.mahir.retailbanking.exception;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleRuntimeException(RuntimeException ex) {
        return ex.getMessage();
    }
}