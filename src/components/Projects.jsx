import {projects} from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
export default function Projects(){
  const list=projects.filter(p=>p&&p.id&&p.title)
  return <section id="work" data-scene="work" className="sec" aria-labelledby="work-h">
    <p className="mono rv">( 01 ) Selected work</p><h2 id="work-h" className="rv">Things I’ve built</h2>
    <div className="plist">{list.map((p,i)=><ProjectCard key={p.id} p={p} index={i}/>)}</div></section>
}
