import {certificates} from '../data/certificates.js'
import CertificateCard from './CertificateCard.jsx'
export default function Certificates(){
  return <section id="certificates" data-scene="certs" className="sec" aria-labelledby="cert-h">
    <p className="mono rv">( 04 ) Certifications</p><h2 id="cert-h" className="rv">Certificates</h2>
    <ul className="cgrid">{certificates.filter(c=>c.id&&c.title).map(c=><CertificateCard key={c.id} c={c}/>)}</ul></section>
}
