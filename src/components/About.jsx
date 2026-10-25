import {profile} from '../data/profile.js'
export default function About(){
  const e=profile.education
  return <section id="about" data-scene="about" className="sec" aria-labelledby="about-h">
    <p className="mono rv">( 02 ) About</p><h2 id="about-h" className="rv">Engineering with an analyst’s eye</h2>
    <div className="rv"><h3 className="mono sub">Education</h3><p className="big">{e.degree}</p>
      <p>{e.school}<br/>{e.university} · {e.period}<br/>CGPA {e.cgpa}</p></div></section>
}
