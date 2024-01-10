package com.example.demo.registration.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationRepo confirmationRepo;

    public void saveConfirmationToken(ConfirmationToken token){
        confirmationRepo.save(token);
    }
    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationRepo.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return confirmationRepo.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
