package com.block.blockapp.domain.repo;
import com.block.blockapp.domain.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface CredentialRepository extends JpaRepository<Credential, Long> {
    Optional<Credential> findByFileHashHex(String fileHashHex);
}