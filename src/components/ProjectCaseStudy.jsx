export default function ProjectCaseStudy({p,id}){
  const shots=[p.image,...(p.screenshots||[])].filter(Boolean)
  return <div id={id} className="case">
    {p.description&&<p>{p.description}</p>}
    {p.features?.length>0&&<><h4 className="mono">Key features</h4><ul>{p.features.map(f=><li key={f}>{f}</li>)}</ul></>}
    {p.details?.length>0&&<><h4 className="mono">Technical details</h4><ul>{p.details.map(f=><li key={f}>{f}</li>)}</ul></>}
    {shots.length>0&&<div className="shots">{shots.map(s=><img key={s} src={s} alt={p.title+' screenshot'} loading="lazy"/>)}</div>}
  </div>
}
