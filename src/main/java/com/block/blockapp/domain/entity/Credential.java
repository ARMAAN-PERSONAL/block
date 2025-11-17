package com.block.blockapp.domain.entity;
import jakarta.persistence.*;
import lombok.*;


@Entity @Table(name = "credential")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Credential {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentName;
    private String program;
    private String studentWallet;
    @Column(length = 66) private String fileHashHex; // 0x...
    private String txHash; // set after tx mined
}