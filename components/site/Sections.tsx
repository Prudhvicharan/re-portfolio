import { ArrowDown, ArrowUpRight } from "lucide-react";
import { education, experience, personal, skills } from "@/lib/data";
import Sheet from "./Sheet";
import Portrait from "./Portrait";
import Clock from "./Clock";
import Contact from "./Contact";
import Register from "./Register";
import { RESUME } from "./Nav";

const hntb = experience[0];
const school = (institution: string) => (institution.includes("Missouri") ? "UMKC" : institution.includes("Vellore") ? "VIT" : institution);

export function Cover() {
  return <Sheet id="cover" no="A-01" title="Cover" tone="blue" className="cover">
    <div className="cover-meta mono">
      <span>{hntb.role} · {hntb.company}</span>
      <span>Full stack · Data engineering</span>
      <span>39.0997° N, 94.5786° W</span>
      <Clock />
    </div>
    <Portrait>
      <span className="fig fig-a"><b>Fig. 1</b>P. Charan, drawn in dots</span>
      <span className="fig fig-b"><b>Move the cursor</b>to disturb the field</span>
      <span className="fig fig-c"><b>Scale 1:1</b>Kansas City, MO</span>
    </Portrait>
    <div className="cover-text">
      <h1 id="cover-title"><span className="line"><span>Prudhvi</span></span><span className="line"><span>Charan</span></span></h1>
      <p className="cover-lede">I build .NET and Python applications and the SQL Server and Databricks pipelines underneath them. Right now, at HNTB, that means auditing job-number data across five production databases.</p>
      <div className="cover-actions">
        <a className="btn btn--solid" href="#work">See the work <ArrowDown size={16} aria-hidden="true" /></a>
        <a className="btn btn--ghost" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé PDF <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </div>
  </Sheet>;
}

const STATEMENT = "Most of my work happens below the interface: the schemas, migrations, pipelines and services that decide whether the numbers on a screen can be";

export function Profile() {
  const ms = education[0];
  const vitrana = experience.filter(r => r.company === "Vitrana");
  const akdene = experience.find(r => r.company === "Akdene")!;
  const notes = [
    { text: `${hntb.role} at ${hntb.company}`, small: `${hntb.location} · since ${hntb.period.split(" – ")[0]}` },
    { text: "Data engineering on Databricks and Medallion Architecture, with Azure Synapse in scope", small: "Current focus" },
    { text: `${akdene.role}, ${akdene.company}`, small: akdene.period },
    { text: `Software Engineer to Senior Software Engineer, Vitrana`, small: `${vitrana[vitrana.length - 1].period.split(" – ")[0]} – ${vitrana[0].period.split(" – ")[1]}` },
    { text: `${ms.shortDegree}, ${ms.institution}`, small: `GPA ${ms.gpa} · ${ms.period}` },
  ];
  return <Sheet id="profile" no="A-02" title="Profile" tone="paper">
    <div className="sheet-head"><h2 id="profile-title">Profile</h2><p className="mono">General arrangement · read before the details</p></div>
    <div className="profile">
      <p className="statement">{STATEMENT.split(" ").map((w, i) => <span key={i} className="w">{w} </span>)}<em className="w">trusted.</em></p>
      <div className="notes reveal">
        <h3 className="mono">General notes</h3>
        <ol>{notes.map((n, i) => <li key={n.text}><span>{String(i + 1).padStart(2, "0")}</span><span>{n.text}<small>{n.small}</small></span></li>)}</ol>
      </div>
    </div>
  </Sheet>;
}

export function Work() {
  return <Sheet id="work" no="A-03" title="Drawing register" tone="blue">
    <div className="sheet-head"><h2 id="work-title">Work</h2><p>Four things I designed and shipped. Open one to see how the system fits together.</p></div>
    <Register />
  </Sheet>;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const START = 2016, YEARS = 11;
function when(text: string) {
  if (/present/i.test(text)) { const d = new Date(); return d.getFullYear() + d.getMonth() / 12; }
  const [m, y] = text.trim().toLowerCase().split(/\s+/);
  return Number(y) + Math.max(0, MONTHS.indexOf(m)) / 12;
}
function span(period: string) {
  const [a, b] = period.split("–");
  const from = when(a), to = when(b);
  return { from: ((from - START) / YEARS) * 100, len: ((to - from) / YEARS) * 100, open: /present/i.test(b) };
}

export function Experience() {
  const rows = [
    ...education.map(e => ({ label: `${school(e.institution)} · ${e.shortDegree}`, period: e.period, kind: "edu" as const })),
    ...experience.map(e => ({ label: `${e.company} · ${e.role}`, period: e.period, kind: "work" as const })),
  ].map(r => ({ ...r, ...span(r.period) })).sort((a, b) => a.from - b.from);
  return <Sheet id="experience" no="A-04" title="Experience" tone="paper">
    <div className="sheet-head"><h2 id="experience-title">Experience</h2><p>Dimension lines show time on the job. Red is industry, ink is study.</p></div>
    <div className="chart" aria-hidden="true">
      <div className="chart-rows">
        {rows.map(r => <div key={r.label} className={`span${r.kind === "work" ? " span--work" : ""}${r.open ? " span--now" : ""}`} style={{ "--from": `${r.from}%`, "--len": `${r.len}%` } as React.CSSProperties}>
          <span className="span-label" style={r.from > 62 ? { left: "auto", right: `${100 - r.from - r.len}%` } : undefined}>{r.label}</span>
          <span className={`span-bar${r.open ? " open" : ""}`} />
        </div>)}
      </div>
      <div className="chart-axis">{Array.from({ length: YEARS }, (_, i) => <span key={i}>{START + i}</span>)}</div>
    </div>
    <div className="roles">
      {experience.map(r => <article className="role" key={`${r.company}-${r.role}`}>
        <div className="role-meta">
          <h3>{r.company}</h3>
          <p className="role-title">{r.role}</p>
          <p className="mono" style={{ opacity: .7 }}>{r.period}<br />{r.location}{r.employment ? ` · ${r.employment}` : ""}</p>
        </div>
        <ul>{r.highlights.map(h => <li key={h}>{h}</li>)}</ul>
      </article>)}
      {education.map(e => <article className="role" key={e.degree}>
        <div className="role-meta">
          <h3>{school(e.institution)}</h3>
          <p className="role-title">{e.degree}</p>
          <p className="mono" style={{ opacity: .7 }}>{e.period}<br />{e.location} · GPA {e.gpa}</p>
        </div>
        <ul>{e.courses.length ? <li>Coursework: {e.courses.join(", ")}</li> : <li>{e.institution}</li>}</ul>
      </article>)}
    </div>
  </Sheet>;
}

export function Materials() {
  let item = 0;
  return <Sheet id="materials" no="A-05" title="Bill of materials" tone="blue">
    <div className="sheet-head"><h2 id="materials-title">Materials</h2><p>Bill of materials: what I build with, grouped the way I use it.</p></div>
    <div className="bom">
      {Object.entries(skills).map(([group, items]) => <section className="bom-group reveal" key={group} aria-label={group}>
        <h3>{group}<span>{items.length} items</span></h3>
        <ul>{items.map(s => <li key={s}><span>{String(++item).padStart(3, "0")}</span>{s}</li>)}</ul>
      </section>)}
    </div>
  </Sheet>;
}

export function ContactSheet() {
  return <Sheet id="contact" no="A-06" title="Contact" tone="blue">
    <h2 id="contact-title" className="sr-only">Contact</h2>
    <Contact />
    <footer className="colophon mono">
      <span>© {new Date().getFullYear()} {personal.name}</span>
      <span>Set in Archivo, Geist and JetBrains Mono</span>
      <a href="#cover">Back to the cover ↑</a>
    </footer>
  </Sheet>;
}
