import {lazy,Suspense,useCallback,useLayoutEffect,useRef,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import useReducedMotion from './hooks/useReducedMotion.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Achievements from './components/Achievements.jsx'
import Certificates from './components/Certificates.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
gsap.registerPlugin(ScrollTrigger)
const Scene3D=lazy(()=>import('./components/Scene3D.jsx'))
export default function App(){
  const reduced=useReducedMotion(),[failed,setFailed]=useState(false),main=useRef(null)
  const onFail=useCallback(()=>setFailed(true),[])
  useLayoutEffect(()=>{
    if(reduced)return
    const ctx=gsap.context(()=>{
      gsap.set('.rv',{y:40,opacity:0})
      ScrollTrigger.batch('.rv',{start:'top 88%',once:true,onEnter:b=>gsap.to(b,{y:0,opacity:1,duration:.9,stagger:.1,ease:'power3.out'})})
    },main);return()=>ctx.revert()
  },[reduced])
  return <div className={failed?'nogl':''}>
    <a className="skip" href="#work">Skip to projects</a>
    {!failed&&<Suspense fallback={null}><Scene3D reduced={reduced} onFail={onFail}/></Suspense>}
    <Navbar/>
    <main ref={main}><Hero reduced={reduced}/><Projects/><About/><Achievements/><Skills/><Certificates/><Contact/></main><Footer/>
  </div>
}
