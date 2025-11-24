package com.block.blockapp.service;

import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.domain.repo.CredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class CredentialService {

    private final CredentialRepository repo;

    /**
     * Save a freshly issued credential (metadata + file hash).
     * Always inserts a new row because fileHashHex must be unique.
     */
    public Credential save(Credential c) {

        c.setCreatedAt(Instant.now());
        return repo.save(c); // ALWAYS save the actual object passed
    }


    /**
     * Used only if you want an explicit constructor-based save.
     */
    public Credential saveIssuedCredential(String studentName,
                                           String program,
                                           String studentWallet,
                                           String fileHashHex) {

        Credential c = new Credential();
        c.setStudentName(studentName);
        c.setProgram(program);
        c.setWallet(studentWallet);
        c.setFileHashHex(fileHashHex);
        c.setCreatedAt(Instant.now());

        return repo.save(c);
    }


    /**
     * Attach blockchain txHash AFTER issuing on-chain.
     */
    public void attachTx(String fileHashHex, String txHash) {

        Credential c = repo.findByFileHashHex(fileHashHex)
                .orElseThrow(() ->
                        new RuntimeException("Credential not found for hash: " + fileHashHex));

        c.setTxHash(txHash);
        repo.save(c);
    }
}
