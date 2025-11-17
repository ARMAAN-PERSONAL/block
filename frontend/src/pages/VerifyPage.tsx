import { useState } from 'react'
import { api } from '../lib/api'
import ResultCard from '../components/ResultCard'


export default function VerifyPage(){
const [hash, setHash] = useState('')
const [res, setRes] = useState<any>(null)
const go = async () => {
try{
const r = await api.get(`/verify/${hash}`)
setRes(r.data)
}catch{ setRes({verified:false}) }
}
return (
<div>
<h2>Verify Credential</h2>
<input placeholder='0x... file hash' value={hash} onChange={e=>setHash(e.target.value)} style={{width:420}}/>
<button onClick={go}>Verify</button>
<div style={{marginTop:12}}>
{res && <ResultCard ok={res.verified} issuer={res.issuer} student={res.student} issuedAt={res.issuedAt} />}
</div>
</div>
)
}