package com.block.blockapp;

import com.block.blockapp.domain.entity.Credential;
import com.block.blockapp.service.CredentialService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CredentialServiceTest {

    @Autowired
    private CredentialService service;

    @Test
    void testSaveCredential() {
        Credential c = new Credential();
        c.setStudentName("Test User");
        c.setProgram("Blockchain");
        c.setWallet("0x0000000000000000000000000000000000000000");
        c.setFileHashHex("0xabc1230000000000000000000000000000000000000000000000000000000000");

        Credential saved = service.save(c);

        assertNotNull(saved.getId());
        assertEquals("Test User", saved.getStudentName());
    }
}
