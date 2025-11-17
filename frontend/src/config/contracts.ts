// ✅ FIXED contracts.ts

import abi from "../abi/CredentialRegistry.json";   // <-- ABI bundled in src/abi
import addr from "../abi/address.json";             // <-- Deployed contract address

export const REGISTRY_ADDRESS = addr.address;       // 👈 address.json MUST contain: { "address": "0x..." }
export const REGISTRY_ABI = abi.abi;                // 👈 Export the ABI properly
