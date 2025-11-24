package com.block.blockapp.controller;

import com.block.blockapp.dto.VerifyResponse;
import com.block.blockapp.service.ContractReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verify")
@RequiredArgsConstructor
public class VerifyController {

    private final ContractReaderService contractReaderService;

    @GetMapping("/{fileHashHex}")
    public ResponseEntity<?> verify(@PathVariable String fileHashHex) {
        try {
            String cleanHash = fileHashHex.trim().toLowerCase();

            var result = contractReaderService.verify(cleanHash);

            if (result == null) {
                return ResponseEntity.status(404)
                        .body("No credential found on-chain for this hash");
            }

            VerifyResponse response = new VerifyResponse(
                    result.ok(),
                    result.issuer(),
                    result.student(),
                    result.issuedAt()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Verification failed: " + e.getMessage());
        }
    }
}
