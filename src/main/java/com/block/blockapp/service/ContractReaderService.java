package com.block.blockapp.service;
import com.block.blockapp.config.Web3Config;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.tx.ReadonlyTransactionManager;
import java.math.BigInteger;
import java.util.Arrays;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Uint64;
import org.web3j.protocol.core.methods.response.EthCall;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint64;

import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.tx.ReadonlyTransactionManager;





@Service @RequiredArgsConstructor
public class ContractReaderService {
    private final Web3Config cfg;
    private Web3j web3() { return Web3j.build(new HttpService(cfg.getRpcUrl())); }


    public VerifyTuple verify(String fileHashHex) throws Exception {

        Web3j w3 = web3();
        var txm = new ReadonlyTransactionManager(w3, cfg.getRegistryAddress());

        Function function = new Function(
                "verify",
                Arrays.asList(new Bytes32(hexToBytes32(fileHashHex))),
                Arrays.asList(
                        new TypeReference<Bool>() {},
                        new TypeReference<Address>() {},
                        new TypeReference<Address>() {},
                        new TypeReference<Uint64>() {}
                )
        );

        String encodedFunction = FunctionEncoder.encode(function);

        EthCall response = w3.ethCall(
                org.web3j.protocol.core.methods.request.Transaction.createEthCallTransaction(
                        cfg.getRegistryAddress(),
                        cfg.getRegistryAddress(),
                        encodedFunction
                ),
                DefaultBlockParameterName.LATEST
        ).send();

        List<Type> results = FunctionReturnDecoder.decode(
                response.getValue(),
                function.getOutputParameters()
        );

        boolean ok = (boolean) results.get(0).getValue();
        String issuer = ok ? results.get(1).getValue().toString() : "0x0";
        String student = ok ? results.get(2).getValue().toString() : "0x0";
        BigInteger issuedAt = ok ? (BigInteger) results.get(3).getValue() : BigInteger.ZERO;

        return new VerifyTuple(ok, issuer, student, issuedAt.longValue());
    }



    private byte[] hexToBytes32(String hex) {
        String clean = hex.startsWith("0x") ? hex.substring(2) : hex;
        byte[] out = new byte[32];
        for (int i = 0; i < 32; i++) {
            int idx = i * 2;
            out[i] = (byte) Integer.parseInt(clean.substring(idx, idx + 2), 16);
        }
        return out;
    }


    public record VerifyTuple(boolean ok, String issuer, String student, long issuedAt) {}
}