package com.block.blockapp.controller;

import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.dto.IssueRequest;
import com.block.blockapp.dto.IssueResponse;
import com.block.blockapp.service.CredentialService;
import com.block.blockapp.service.HashService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/credentials")
@RequiredArgsConstructor
public class CredentialIssueController {

    private final HashService hashService;
    private final CredentialService credentialService;

    @PostMapping(value = "/issue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IssueResponse issue(
            @Valid @RequestPart("meta") IssueRequest meta,
            @RequestPart("pdf") MultipartFile pdf
    ) throws Exception {

        String fileHashHex = hashService.sha256Hex(pdf.getInputStream());

        Credential c = Credential.builder()
                .studentName(meta.getStudentName())
                .program(meta.getProgram())
                .studentWallet(meta.getStudentWallet())
                .fileHashHex(fileHashHex)
                .build();

        credentialService.save(c);
        return new IssueResponse(fileHashHex);
    }
}
