import { personal } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-content">
        <div className="section-heading"><span>02.</span><h2>Who I Am</h2></div>
        <p className="intro-copy">{personal.bio}</p>
        <p className="intro-copy">My experience includes healthcare analytics, job-application tracking, data modeling, testing, and production support.</p>
        <ul className="skill-pills" aria-label="Core technologies">
          {[".NET/C#", "Python", "T-SQL", "Azure", "Databricks", "React", "TypeScript"].map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
    </SectionWrapper>
  );
}
