package com.block.blockapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueOnChainRequest {
    private String fileHashHex;
    private String studentWallet;
}
