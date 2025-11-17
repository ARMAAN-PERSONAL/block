import { useRef } from 'react'


export default function FileDrop({ onFile }: { onFile:(f:File)=>void }) {
const ref = useRef<HTMLInputElement>(null)
return (
<div style={{border:'1px dashed #888', padding:16, borderRadius:8}} onClick={()=>ref.current?.click()}>
<input type="file" accept="application/pdf" ref={ref} style={{display:'none'}} onChange={e=>{
const f = e.target.files?.[0]; if (f) onFile(f);
}}/>
<p>Click to choose a PDF</p>
</div>
)
}