import {achievements} from '../data/achievements.js'
export default function Achievements(){
  return <section id="achievements" data-scene="about" className="sec" aria-labelledby="ach-h">
    <p className="mono rv">Achievements <small>(self-reported, from resume)</small></p><h2 id="ach-h" className="rv">By the numbers</h2>
    <dl className="stats">{achievements.map(a=><div key={a.id} className="rv"><dt>{a.label}<br/><span className="mono">{a.detail}</span></dt><dd>{a.value}</dd></div>)}</dl></section>
}
