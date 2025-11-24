package com.block.blockapp;

import com.block.blockapp.service.HashService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.io.ByteArrayInputStream;

class HashServiceTest {

    private final HashService hashService = new HashService();

    @Test
    void testSha256Hex() throws Exception {
        String text = "hello world";

        ByteArrayInputStream inputStream =
                new ByteArrayInputStream(text.getBytes());

        String hash = hashService.sha256Hex(inputStream);

        assertNotNull(hash);

        // Accept both formats:
        // 1) pure 64 hex chars
        // 2) 0x + 64 hex chars
        assertTrue(
                hash.matches("^0x[a-f0-9]{64}$") || hash.matches("^[a-f0-9]{64}$"),
                "Hash must be 64 hex characters (with or without 0x)"
        );

        System.out.println("Hash = " + hash);
    }
}
