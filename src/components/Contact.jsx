import {Mail,Github,Linkedin,Download,ArrowUpRight} from 'lucide-react'
import {profile as p} from '../data/profile.js'
import LinkButton from './LinkButton.jsx'
export default function Contact(){
  const L=[[Mail,p.email,'mailto:'+p.email,'Email Anish'],[Github,p.github.replace('https://',''),p.github,'Anish on GitHub'],[Linkedin,p.linkedin.replace('https://',''),p.linkedin,'Anish on LinkedIn']]
  return <section id="contact" data-scene="contact" className="sec" aria-labelledby="c-h">
    <p className="mono rv">( 05 ) Contact</p><h2 id="c-h" className="rv">Let’s build something.</h2>
    <ul className="clinks rv">{L.map(([I,t,h,a])=><li key={h}><a href={h} aria-label={a} {...(h.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}><I size={20}/><span>{t}</span><ArrowUpRight size={18}/></a></li>)}</ul>
    {__HAS_RESUME__&&<LinkButton href={p.resumeUrl} variant="primary" icon={Download} download>Download Resume</LinkButton>}</section>
}
