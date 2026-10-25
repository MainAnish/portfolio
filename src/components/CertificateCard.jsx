import {Award} from 'lucide-react'
import LinkButton from './LinkButton.jsx'
export default function CertificateCard({c}){
  return <li className="cert rv">
    {c.image&&<img src={c.image} alt={c.title+' certificate preview'} loading="lazy"/>}
    <Award size={22} aria-hidden="true" className="award"/>
    <h3>{c.title}</h3><p className="issuer">{c.issuer}</p>
    {(c.issuedDate||c.credentialId)&&<p className="mono">{[c.issuedDate,c.credentialId&&'ID '+c.credentialId].filter(Boolean).join(' · ')}</p>}
    {c.description&&<p className="pdesc">{c.description}</p>}
    <LinkButton href={c.credentialUrl} label={'View certificate: '+c.title}>View Certificate</LinkButton>
  </li>
}
