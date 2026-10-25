import {useEffect,useRef} from 'react'
import * as THREE from 'three'
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// Per-section pose: [x as fraction of half-width, y as fraction of half-height, scale, ring opacity, canvas opacity]
// Content sections park the sculpture in the right gutter that CSS reserves (.sec padding-right).
const D={hero:[.6,0,.85,.7,1],work:[.8,.1,.42,.25,1],about:[.8,-.1,.42,.25,1],skills:[.82,.1,.4,.25,1],certs:[.82,0,.4,.25,1],contact:[.8,0,.5,.3,1]}
const M={hero:[.3,.55,.55,.6,1],rest:[.78,.9,.26,.1,.28]}
export default function Scene3D({reduced,onFail}){
  const ref=useRef(null)
  useEffect(()=>{
    const canvas=ref.current;let renderer
    try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'})}catch{onFail();return}
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.toneMapping=THREE.ACESFilmicToneMapping
    const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.z=7.5
    const pm=new THREE.PMREMGenerator(renderer),env=pm.fromScene(new RoomEnvironment(),.04);scene.environment=env.texture
    const group=new THREE.Group();scene.add(group)
    const geo=new THREE.TorusKnotGeometry(1.25,.4,240,36,2,3)
    const mat=new THREE.MeshPhysicalMaterial({color:0x8fa8ff,metalness:1,roughness:.16,iridescence:1,iridescenceIOR:1.7,clearcoat:1,envMapIntensity:1.3})
    group.add(new THREE.Mesh(geo,mat))
    const rGeo=new THREE.TorusGeometry(2.5,.012,8,180),rMat=new THREE.MeshBasicMaterial({color:0x7aa2ff,transparent:true,opacity:.7})
    const ring=new THREE.Mesh(rGeo,rMat);ring.rotation.x=1.25;group.add(ring)
    const N=500,pos=new Float32Array(N*3)
    for(let i=0;i<N;i++){const r=3+Math.random()*7,a=Math.random()*6.283,b=Math.acos(2*Math.random()-1);pos.set([r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a)],i*3)}
    const pGeo=new THREE.BufferGeometry();pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3))
    const pMat=new THREE.PointsMaterial({size:.02,color:0xb8c6ff,transparent:true,opacity:.45,depthWrite:false})
    const pts=new THREE.Points(pGeo,pMat);scene.add(pts)
    const l1=new THREE.PointLight(0x6f9bff,60,30);l1.position.set(-4,3,4);scene.add(l1)
    const l2=new THREE.PointLight(0x8b6cff,45,30);l2.position.set(4,-3,3);scene.add(l2)
    const st={fx:.6,fy:0,s:.85,r:.7,o:0,p:0},m={x:0,y:0,tx:0,ty:0},tanH=Math.tan(THREE.MathUtils.degToRad(20));let sp=0,raf=0,on=true,cur='hero'
    const draw=(t=0)=>{
      m.x+=(m.tx-m.x)*.05;m.y+=(m.ty-m.y)*.05;sp+=(st.p-sp)*.08
      const hh=tanH*7.5,hw=hh*cam.aspect
      group.position.set(st.fx*hw,st.fy*hh+(reduced?0:Math.sin(t*.0009)*.07),0);group.scale.setScalar(st.s)
      group.rotation.set(m.y*.35+sp*1.2,m.x*.45+sp*Math.PI*2+(reduced?0:t*.00012),0)
      ring.rotation.z=reduced?0:t*.0002;pts.rotation.y=reduced?0:t*.00003;rMat.opacity=st.r;canvas.style.opacity=st.o
      renderer.render(scene,cam)
    }
    const go=k=>{cur=k;const wide=innerWidth>860,t=wide?(D[k]||D.work):(M[k]||M.rest)
      gsap.to(st,{fx:t[0],fy:t[1],s:t[2],r:t[3],o:t[4],duration:reduced?0:1.4,ease:'power3.inOut',overwrite:'auto',onUpdate:()=>reduced&&draw()})}
    const size=()=>{renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();go(cur)}
    const loop=t=>{if(!on)return;raf=requestAnimationFrame(loop);draw(t)}
    const start=()=>{cancelAnimationFrame(raf);on=true;raf=requestAnimationFrame(loop)},stop=()=>{on=false;cancelAnimationFrame(raf)}
    const move=e=>{m.tx=e.clientX/innerWidth*2-1;m.ty=e.clientY/innerHeight*2-1}
    const vis=()=>document.hidden?stop():start()
    addEventListener('resize',size);size()
    if(!reduced){addEventListener('pointermove',move);document.addEventListener('visibilitychange',vis);start()}
    const ctx=gsap.context(()=>{
      document.querySelectorAll('[data-scene]').forEach(el=>ScrollTrigger.create({trigger:el,start:'top 60%',end:'bottom 60%',onToggle:s=>s.isActive&&go(el.dataset.scene)}))
      ScrollTrigger.create({trigger:document.body,start:'top top',end:'bottom bottom',onUpdate:s=>{st.p=s.progress;reduced&&draw()}})
    })
    return()=>{ctx.revert();gsap.killTweensOf(st);stop();removeEventListener('resize',size);removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',vis)
      ;[geo,rGeo,pGeo,mat,rMat,pMat,env].forEach(o=>o.dispose());pm.dispose();renderer.dispose()}
  },[reduced,onFail])
  return <canvas ref={ref} className="scene" aria-hidden="true" style={{opacity:0}}/>
}
