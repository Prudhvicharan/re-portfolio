import { skills } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";

export default function TechStack() {
  return (
    <SectionWrapper id="skills" className="surface-section">
      <div className="section-content">
        <div className="section-heading"><span>04.</span><h2>What I Build With</h2></div>
        <div className="skills-grid">
          {Object.entries(skills).map(([label, items]) => (
            <div key={label}>
              <h3 className="skill-heading">{label}</h3>
              <ul className="skill-pills">{items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
