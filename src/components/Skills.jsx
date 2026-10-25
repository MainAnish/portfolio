import {skills} from '../data/skills.js'
export default function Skills(){
  return <section id="skills" data-scene="skills" className="sec" aria-labelledby="sk-h">
    <p className="mono rv">( 03 ) Technical index</p><h2 id="sk-h" className="rv">Skills</h2>
    <dl className="index">{skills.map((g,i)=><div key={g.id} className="row rv"><dt className="mono"><span>{String(i+1).padStart(2,'0')}</span>{g.name}</dt>
      <dd><ul>{g.items.map(s=><li key={s}>{s}</li>)}</ul></dd></div>)}</dl></section>
}
