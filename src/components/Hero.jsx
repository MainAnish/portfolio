import {useLayoutEffect,useRef} from 'react'
import gsap from 'gsap'
import {ArrowDown,ArrowUpRight} from 'lucide-react'
import {profile} from '../data/profile.js'
import LinkButton from './LinkButton.jsx'
export default function Hero({reduced}){
  const root=useRef(null)
  useLayoutEffect(()=>{
    if(reduced)return
    const ctx=gsap.context(()=>{
      gsap.timeline({defaults:{ease:'power4.out'}}).from('.h-line>span',{yPercent:115,duration:1.2,stagger:.12}).from('.h-fade',{y:20,opacity:0,duration:.9,stagger:.1},'-=.7')
    },root);return()=>ctx.revert()
  },[reduced])
  return <section id="top" data-scene="hero" className="hero" ref={root}>
    <p className="mono h-fade">{profile.eyebrow}</p>
    <h1 aria-label={profile.name}><span className="h-line"><span>ANISH</span></span><span className="h-line"><span>KUMAR</span></span></h1>
    <p className="tag h-fade">{profile.heading}</p>
    <p className="lede h-fade">{profile.intro}</p>
    <div className="cta h-fade"><LinkButton href="#work" variant="primary" icon={ArrowUpRight}>Selected projects</LinkButton><LinkButton href="#contact">Get in touch</LinkButton></div>
    <a className="scroll mono h-fade" href="#work" aria-label="Scroll to projects">Scroll <ArrowDown size={14}/></a>
  </section>
}
