import {useEffect,useState} from 'react'
import {Menu,X} from 'lucide-react'
import {profile} from '../data/profile.js'
const links=profile.nav
export default function Navbar(){
  const [open,setOpen]=useState(false),[active,setActive]=useState('')
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:'-45% 0px -50% 0px'})
    links.forEach(([,id])=>{const el=document.getElementById(id);el&&io.observe(el)});return()=>io.disconnect()
  },[])
  return <header className="nav">
    <a href="#top" className="wordmark" aria-label="Anish Kumar, home">AK</a>
    <button className="burger" aria-expanded={open} aria-controls="menu" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
    <nav id="menu" aria-label="Primary" className={open?'open':''}>
      {links.map(([l,id])=><a key={id} href={'#'+id} aria-current={active===id?'true':undefined} onClick={()=>setOpen(false)}>{l}</a>)}
    </nav></header>
}
