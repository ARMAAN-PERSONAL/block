package com.block.blockapp.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "credential")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private String program;

    @Column(name = "wallet", length = 42)
    private String wallet;

    @Column(length = 66, nullable = false, unique = true)
    private String fileHashHex;   // 0x + 64 hex chars

    @Column(length = 80)
    private String txHash;        // blockchain tx hash

    private Instant createdAt;
}
