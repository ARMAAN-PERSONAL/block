import React, { useState } from "react";
import { api } from "../lib/api";
import { getSigner } from "../lib/ethers";
import { REGISTRY_ADDRESS, REGISTRY_ABI } from "../config/contracts";   // ✅ only here
import FileDrop from "../components/FileDrop";
import { ethers } from "ethers";



export default function IssuePage(){
const [studentName, setName] = useState('')
const [program, setProgram] = useState('')
const [studentWallet, setWallet] = useState('')
const [pdf, setPdf] = useState<File|null>(null)
const [fileHash, setHash] = useState('')
const [tx, setTx] = useState('')


const issue = async () => {
if(!pdf) return alert('Pick a PDF')
const meta = new Blob([JSON.stringify({studentName, program, studentWallet})], {type:'application/json'})
const fd = new FormData()
fd.append('meta', meta)
fd.append('pdf', pdf)
const r = await api.post('/credentials/issue', fd, { headers:{'Content-Type':'multipart/form-data'} })
const hashHex = r.data.fileHashHex as string
setHash(hashHex)


const signer = await getSigner()
const contract = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, signer)
const txResp = await contract.issueCredential(hashHex, studentWallet)
const receipt = await txResp.wait()
setTx(receipt.hash)
await api.post('/credentials/attach-tx', null, { params:{ fileHashHex: hashHex, txHash: receipt.hash }})
alert('Issued on-chain!')
}


return (
<div>
<h2>Issue Credential</h2>
<div style={{display:'grid', gap:8, maxWidth:520}}>
<input placeholder='Student Name' value={studentName} onChange={e=>setName(e.target.value)} />
<input placeholder='Program' value={program} onChange={e=>setProgram(e.target.value)} />
<input placeholder='Student Wallet (0x...)' value={studentWallet} onChange={e=>setWallet(e.target.value)} />
<FileDrop onFile={setPdf} />
<button onClick={issue}>Issue</button>
</div>
{fileHash && <p>Hash: {fileHash}</p>}
{tx && <p>Tx: {tx}</p>}
</div>
)
}