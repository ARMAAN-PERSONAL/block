package com.block.blockapp.service;

import com.block.blockapp.config.Web3Config;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Numeric;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.generated.Bytes32;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class BlockChainService {

    private final Web3Config web3Config;

    private Web3j web3j;
    private Credentials credentials;

    // Polygon Amoy chain ID
    private static final long CHAIN_ID = 80002;

    @PostConstruct
    public void init() {
        this.web3j = Web3j.build(new HttpService(web3Config.getRpcUrl()));
        this.credentials = Credentials.create(web3Config.getPrivateKey());

        System.out.println("Connected to chain: " + web3Config.getRpcUrl());
        System.out.println("Backend wallet: " + credentials.getAddress());
        System.out.println("Contract: " + web3Config.getRegistryAddress());
    }

    /** FIX ADDED: so other services can call eth_call */
    public Web3j getWeb3j() {
        return this.web3j;
    }

    public String issueCredential(String fileHashHex, String studentWallet) throws Exception {

        // Convert hash to bytes32
        Bytes32 fileHash = new Bytes32(
                Numeric.hexStringToByteArray(fileHashHex)
        );

        // Build smart contract function call
        Function function = new Function(
                "issueCredential",
                Arrays.asList(fileHash, new Address(studentWallet)),
                Collections.emptyList()
        );

        String encodedFunction = FunctionEncoder.encode(function);

        // Fetch nonce
        BigInteger nonce = web3j.ethGetTransactionCount(
                credentials.getAddress(),
                DefaultBlockParameterName.LATEST
        ).send().getTransactionCount();

        // ---------- FIXED GAS VALUES ----------
        BigInteger gasLimit = BigInteger.valueOf(300000); // safe limit

        // MINIMUM FOR AMOY (as of 2025)
        BigInteger maxPriorityFee = BigInteger.valueOf(30_000_000_000L); // 30 gwei
        BigInteger maxFeePerGas = BigInteger.valueOf(60_000_000_000L);   // 60 gwei
        // --------------------------------------

        RawTransaction tx = RawTransaction.createTransaction(
                CHAIN_ID,
                nonce,
                gasLimit,
                web3Config.getRegistryAddress(),
                BigInteger.ZERO,
                encodedFunction,
                maxPriorityFee,
                maxFeePerGas
        );

        byte[] signed = TransactionEncoder.signMessage(tx, CHAIN_ID, credentials);
        String hexSigned = Numeric.toHexString(signed);

        EthSendTransaction resp = web3j.ethSendRawTransaction(hexSigned).send();

        if (resp.hasError()) {
            throw new RuntimeException("Blockchain error: " + resp.getError().getMessage());
        }

        return resp.getTransactionHash();
    }

}
