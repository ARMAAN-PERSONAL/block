package com.block.blockapp.service;

import com.block.blockapp.config.Web3Config;
import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.domain.repo.CredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContractReaderService {

    private final CredentialRepository repo;
    private final Web3Config cfg;

    /**
     * NEW LOGIC:
     * ✔ No blockchain calls
     * ✔ Verify ONLY from DB
     * ✔ If credential exists → ok = true
     * ✔ issuer = backend wallet (derived from private key)
     * ✔ student = wallet from DB
     * ✔ issuedAt = createdAt timestamp
     */
    public VerifyTuple verify(String fileHashHex) {

        // clean hex input
        String clean = fileHashHex.startsWith("0x")
                ? fileHashHex.toLowerCase()
                : "0x" + fileHashHex.toLowerCase();

        return repo.findByFileHashHex(clean)
                .map(c -> new VerifyTuple(
                        true,
                        cfg.getBackendWallet(),              // issuer
                        c.getWallet(),                       // student
                        c.getCreatedAt().getEpochSecond()    // issuedAt
                ))
                .orElseGet(() -> new VerifyTuple(
                        false,
                        "0x0",
                        "0x0",
                        0L
                ));
    }

    public record VerifyTuple(boolean ok, String issuer, String student, long issuedAt) {}
}
