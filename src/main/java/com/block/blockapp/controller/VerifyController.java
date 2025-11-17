package com.block.blockapp.controller;
import com.block.blockapp.dto.VerifyResponse;
import com.block.blockapp.service.ContractReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController @RequestMapping("/api/verify") @RequiredArgsConstructor
public class VerifyController {
    private final ContractReaderService chain;


    @GetMapping("/{fileHashHex}")
    public VerifyResponse verify(@PathVariable String fileHashHex) throws Exception {
        var t = chain.verify(fileHashHex);
        return new VerifyResponse(t.ok(), t.issuer(), t.student(), t.issuedAt());
    }
}