package com.block.blockapp.dto;
import lombok.*;


@Data @AllArgsConstructor
public class VerifyResponse {
    private boolean verified;
    private String issuer;
    private String student;
    private long issuedAt;
}