package com.block.blockapp.service;

import com.block.blockapp.config.Web3Config;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;


@Service
@RequiredArgsConstructor
public class BlockChainService {

    private final Web3Config web3Config;

    private Web3j web3j;
    private Credentials credentials;

    @PostConstruct
    public void init() {
        System.out.println("🚀 Connecting to blockchain...");

        web3j = Web3j.build(new HttpService(web3Config.getRpcUrl()));
        credentials = Credentials.create(web3Config.getPrivateKey());

        System.out.println("✅ Web3 connected: " + web3Config.getRpcUrl());
        System.out.println("🔑 Wallet loaded: " + credentials.getAddress());
        System.out.println("📄 Smart Contract: " + web3Config.getRegistryAddress());
        System.out.println("-------------------------------------------------------------");
    }

    public Web3j getWeb3j() {
        return web3j;
    }

    public Credentials getCredentials() {
        return credentials;
    }
}
