package com.block.blockapp.service;
import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.domain.repo.CredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service @RequiredArgsConstructor
public class CredentialService {
    private final CredentialRepository repo;
    public Credential save(Credential c) { return repo.save(c); }
    public void attachTxHash(String fileHashHex, String txHash) {
        repo.findByFileHashHex(fileHashHex).ifPresent(c -> { c.setTxHash(txHash); repo.save(c); });
    }
}