// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract CredentialRegistry {
address public owner;
mapping(address => bool) public isInstitution;


struct Credential {
address issuer;
address student;
bytes32 fileHash; // SHA-256 as bytes32
uint64 issuedAt;
}


// Keyed directly by the fileHash for simple verification demos
mapping(bytes32 => Credential) public byHash;


event InstitutionToggled(address indexed inst, bool enabled);
event CredentialIssued(bytes32 indexed fileHash, address indexed issuer, address indexed student, uint64 issuedAt);


modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }
modifier onlyInstitution() { require(isInstitution[msg.sender], "not institution"); _; }


constructor() { owner = msg.sender; }


function setInstitution(address inst, bool enabled) external onlyOwner {
isInstitution[inst] = enabled;
emit InstitutionToggled(inst, enabled);
}


function issueCredential(bytes32 fileHash, address student) external onlyInstitution {
require(byHash[fileHash].issuedAt == 0, "already issued");
byHash[fileHash] = Credential(msg.sender, student, fileHash, uint64(block.timestamp));
emit CredentialIssued(fileHash, msg.sender, student, uint64(block.timestamp));
}


function verify(bytes32 fileHash) external view returns (bool exists, address issuer, address student, uint64 issuedAt) {
Credential memory c = byHash[fileHash];
if (c.issuedAt == 0) return (false, address(0), address(0), 0);
return (true, c.issuer, c.student, c.issuedAt);
}
}