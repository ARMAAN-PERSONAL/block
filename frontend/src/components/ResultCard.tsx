export default function ResultCard({ok, issuer, student, issuedAt}:{ok:boolean, issuer?:string, student?:string, issuedAt?:number}) {
if(!ok) return <div style={{padding:12, border:'1px solid #f00'}}>Not found</div>
const dt = issuedAt ? new Date(issuedAt*1000).toLocaleString() : ''
return (
<div style={{padding:12, border:'1px solid #0a0'}}>
<div>✅ Verified</div>
<div>Issuer: {issuer}</div>
<div>Student: {student}</div>
<div>Issued: {dt}</div>
</div>
)
}