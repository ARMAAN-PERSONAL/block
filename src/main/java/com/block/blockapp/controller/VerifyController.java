package com.block.blockapp.controller;

import com.block.blockapp.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/verify")
@RequiredArgsConstructor
public class VerifyController {

    private final CredentialService credentialService;

    @GetMapping("/{txHash}")
    public ResponseEntity<?> verify(@PathVariable String txHash) {

        String clean = txHash.trim().toLowerCase();

        return credentialService.findByTxHash(clean)
                .map(c -> ResponseEntity.ok(Map.of(
                        "verified", true,
                        "txHash", c.getTxHash(),
                        "fileHashHex", c.getFileHashHex(),
                        "studentName", c.getStudentName(),
                        "program", c.getProgram(),
                        "wallet", c.getWallet(),
                        "issuedAt", c.getCreatedAt()
                )))
                .orElseGet(() -> ResponseEntity.ok(Map.of("verified", false)));
    }
}
