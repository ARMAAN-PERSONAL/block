package com.block.blockapp.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;

@Configuration
@Getter
public class Web3Config {

    @Value("${b-lock.chain.rpcUrl}")
    private String rpcUrl;

    @Value("${b-lock.chain.privateKey}")
    private String privateKey;

    @Value("${b-lock.chain.registryAddress}")
    private String registryAddress;

    public String getBackendWallet() {
        return Credentials.create(privateKey).getAddress();
    }


}
