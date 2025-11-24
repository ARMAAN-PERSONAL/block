package com.block.blockapp.controller;

import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.dto.IssueOnChainRequest;
import com.block.blockapp.dto.IssueRequest;
import com.block.blockapp.dto.IssueResponse;
import com.block.blockapp.service.BlockChainService;
import com.block.blockapp.service.CredentialService;
import com.block.blockapp.service.HashService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/credentials")
@RequiredArgsConstructor
public class CredentialIssueController {

    private final HashService hashService;
    private final CredentialService credentialService;
    private final BlockChainService blockChainService;

    @PostMapping(value = "/issue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IssueResponse issue(
            @Valid @RequestPart("meta") IssueRequest meta,
            @RequestPart("pdf") MultipartFile pdf
    ) throws Exception {

        String fileHashHex = hashService.sha256Hex(pdf.getInputStream()).toLowerCase();
        if (!fileHashHex.startsWith("0x")) fileHashHex = "0x" + fileHashHex;

        System.out.println("BACKEND GENERATED HASH = " + fileHashHex);

        Credential c = Credential.builder()
                .studentName(meta.getStudentName())
                .program(meta.getProgram())
                .wallet(meta.getStudentWallet())
                .fileHashHex(fileHashHex)
                .createdAt(Instant.now())
                .build();

        credentialService.save(c);

        return new IssueResponse(fileHashHex);
    }

    @PostMapping("/issue-onchain")
    public ResponseEntity<?> issueOnChain(@RequestBody IssueOnChainRequest req) {
        try {
            String fileHashHex = req.getFileHashHex().toLowerCase();
            String studentWallet = req.getStudentWallet();

            String txHash = blockChainService.issueCredential(fileHashHex, studentWallet);

            credentialService.attachTx(fileHashHex, txHash);

            return ResponseEntity.ok(Map.of("txHash", txHash));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("On-chain issue failed");
        }
    }

    // ⭐ VERIFY BY TX_HASH (NOT fileHashHex)
    @GetMapping("/verify/{txHash}")
    public ResponseEntity<?> verify(@PathVariable String txHash) {

        String clean = txHash.trim().toLowerCase();

        return credentialService.findByTxHash(clean)
                .map(c -> ResponseEntity.ok(Map.of(
                        "verified", true,
                        "credential", c
                )))
                .orElseGet(() -> ResponseEntity.ok(Map.of("verified", false)));
    }

}
