package com.block.blockapp;

import com.block.blockapp.controller.CredentialIssueController;
import com.block.blockapp.service.BlockChainService;
import com.block.blockapp.service.CredentialService;
import com.block.blockapp.service.HashService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CredentialIssueController.class)
public class CredentialIssueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean private HashService hashService;
    @MockBean private CredentialService credentialService;
    @MockBean private BlockChainService blockChainService;

    @Test
    void testIssueOnChain() throws Exception {
        when(blockChainService.issueCredential("0xaaa", "0x000"))
                .thenReturn("0xtesttx123");

        mockMvc.perform(post("/api/credentials/issue-onchain")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"fileHashHex\": \"0xaaa\", \"studentWallet\": \"0x000\"}")
                )
                .andExpect(status().isOk());
    }
}
