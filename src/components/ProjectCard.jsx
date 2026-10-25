import {useId,useState} from 'react'
import {Plus,Minus,Github,ExternalLink} from 'lucide-react'
import TechTag from './TechTag.jsx'
import LinkButton from './LinkButton.jsx'
import ProjectCaseStudy from './ProjectCaseStudy.jsx'
export default function ProjectCard({p,index}){
  const [open,setOpen]=useState(false),id=useId(),num=p.number||String(index+1).padStart(2,'0')
  const hasCase=p.description||p.features?.length||p.details?.length||p.image||p.screenshots?.length
  return <article className={'project v'+(index%3+1)+' rv'}>
    <span className="pnum" aria-hidden="true">{num}</span>
    <div className="pbody">
      <p className="mono">{p.category}</p>
      <h3>{p.title}</h3>
      <p className="pdesc">{p.summary||p.description}</p>
      {p.technologies?.length>0&&<ul className="chips" aria-label="Technology stack">{p.technologies.map(t=><TechTag key={t}>{t}</TechTag>)}</ul>}
      <div className="actions">
        {hasCase&&<button className="btn primary" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}>{open?<Minus size={16}/>:<Plus size={16}/>}Case study</button>}
        <LinkButton href={p.githubUrl} icon={Github} label={'GitHub repository for '+p.title}>GitHub</LinkButton>
        <LinkButton href={p.liveUrl} icon={ExternalLink} label={'Live demo of '+p.title}>Live demo</LinkButton>
      </div>
      {open&&<ProjectCaseStudy p={p} id={id}/>}
    </div></article>
}
