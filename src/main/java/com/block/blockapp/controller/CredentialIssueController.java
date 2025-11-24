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

    // ---------------------------------------------------------------------
    // 1) ISSUE (BACKEND HASH + SAVE IN DB)
    // ---------------------------------------------------------------------
    @PostMapping(value = "/issue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IssueResponse issue(
            @Valid @RequestPart("meta") IssueRequest meta,
            @RequestPart("pdf") MultipartFile pdf
    ) throws Exception {

        // Compute SHA-256 hash
        String fileHashHex = hashService.sha256Hex(pdf.getInputStream());

        // Guarantee correct 0x prefix only once
        if (!fileHashHex.startsWith("0x")) {
            fileHashHex = "0x" + fileHashHex.toLowerCase();
        } else {
            fileHashHex = fileHashHex.toLowerCase();
        }

        System.out.println("BACKEND GENERATED HASH = " + fileHashHex);

        // Build full credential entity
        Credential c = Credential.builder()
                .studentName(meta.getStudentName())
                .program(meta.getProgram())
                .wallet(meta.getStudentWallet())
                .fileHashHex(fileHashHex)
                .createdAt(Instant.now())
                .build();

        // Save correctly
        credentialService.save(c);

        // Return the hash to frontend
        return new IssueResponse(fileHashHex);
    }

    // ---------------------------------------------------------------------
    // 2) ISSUE ON-CHAIN (BACKEND SIGNS TX)
    // ---------------------------------------------------------------------
    @PostMapping("/issue-onchain")
    public ResponseEntity<?> issueOnChain(@RequestBody IssueOnChainRequest req) {
        try {
            String fileHashHex = req.getFileHashHex().toLowerCase();
            String studentWallet = req.getStudentWallet();

            System.out.println("ISSUE ON-CHAIN FOR HASH = " + fileHashHex);

            // Send blockchain transaction
            String txHash = blockChainService.issueCredential(
                    fileHashHex,
                    studentWallet
            );

            // Save txHash to DB
            credentialService.attachTx(fileHashHex, txHash);

            return ResponseEntity.ok(Map.of("txHash", txHash));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("On-chain issue failed");
        }
    }
}
