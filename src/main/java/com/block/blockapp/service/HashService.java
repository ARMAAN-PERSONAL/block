package com.block.blockapp.service;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;
import java.io.InputStream;


@Service
public class HashService {
    public String sha256Hex(InputStream in) throws Exception {
// returns lowercase hex; we prefix with 0x to match solidity bytes32 convention below
        String hex = DigestUtils.sha256Hex(in);
        return "0x" + hex; // 64 hex chars
    }
}