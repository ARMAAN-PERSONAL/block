package com.block.blockapp.service;

import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.domain.repo.CredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CredentialService {

    private final CredentialRepository repo;

    public Credential save(Credential c) {
        c.setCreatedAt(Instant.now());
        return repo.save(c);
    }

    public Optional<Credential> findByTxHash(String txHash) {
        return repo.findByTxHash(txHash);
    }

    public void attachTx(String fileHashHex, String txHash) {
        Credential c = repo.findByFileHashHex(fileHashHex)
                .orElseThrow(() -> new RuntimeException("Credential not found: " + fileHashHex));

        c.setTxHash(txHash);
        repo.save(c);
    }

    // ⭐ FIX ADDED: verification lookup
    public Optional<Credential> findByHash(String hashLower) {
        return repo.findByFileHashHex(hashLower);
    }
}
