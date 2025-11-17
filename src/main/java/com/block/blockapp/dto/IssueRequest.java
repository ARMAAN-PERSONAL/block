package com.block.blockapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class IssueRequest {

    @NotBlank private String studentName;
    @NotBlank private String program;
    @NotBlank private String studentWallet; // 0x...
}
