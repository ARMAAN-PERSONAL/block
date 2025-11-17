package com.block.blockapp.dto;
import lombok.AllArgsConstructor; import lombok.Data;


@Data @AllArgsConstructor
public class IssueResponse {
    private String fileHashHex; // send to frontend for contract call
}