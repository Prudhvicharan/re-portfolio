export const personal = {
  name: "Prudhvi Charan P",
  firstName: "PRUDHVI",
  lastName: "CHARAN",
  title: "Senior Full-Stack AI Engineer",
  roles: [
    "Senior Full-Stack Engineer",
    "AI Systems Architect",
    "Cloud-Native Builder",
    "Microservices Engineer",
  ],
  bio: "I architect systems that scale to millions and ship AI features that actually solve real problems. Five years across healthcare, recruitment, and enterprise SaaS — from microfrontend ecosystems to OpenAI-powered pipelines running at 10M+ requests a month. I care about code that performs, teams that ship, and software that earns trust.",
  email: "psprudhvicharan@gmail.com",
  phone: "816-762-8317",
  linkedin: "linkedin.com/in/prudhvi-charan",
  github: "github.com/Prudhvicharan",
  portfolio: "react.prudhvicharan.com",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years Experience", icon: "⚡" },
  { value: 50, suffix: "K+", label: "Users Served", icon: "👥" },
  { value: 10, suffix: "M+", label: "Monthly API Requests", icon: "🌐" },
  { value: 99.9, suffix: "%", label: "Uptime Delivered", icon: "🔒" },
  { value: 6, suffix: "", label: "AI Apps Shipped", icon: "🤖" },
  { value: 45, suffix: "%", label: "Avg Efficiency Gains", icon: "📈" },
];

export const experience = [
  {
    role: "Senior Full-Stack AI Engineer",
    company: "Akdene",
    location: "Remote",
    period: "March 2025 – Present",
    current: true,
    highlights: [
      "Architected 6 enterprise AI-powered apps across healthcare & recruitment — 50K+ users, 99.9% uptime",
      "Built OpenAI GPT-4 + LangChain resume parser → 45% less manual review, hiring cycles 3 weeks faster",
      "Decomposed monoliths into 15+ microservices → 60% faster deployments, 50+ weekly production releases",
      "10M+ monthly API requests at sub-100ms P95 latency using Redis caching and rate limiting",
      "React/TypeScript migration from Angular → 35% developer productivity gain, 40% fewer bugs",
      "Mentored 5 engineers → 30% team velocity improvement",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Vitrana",
    location: "Bangalore, India",
    period: "June 2021 – December 2022",
    current: false,
    highlights: [
      "Led HiLIT healthcare analytics platform — 5M+ adverse event records, 2,000+ global professionals",
      "Microfrontend architecture across 7 enterprise apps → 35% faster builds, 50% better modularity",
      ".NET Core APIs: 500K+ daily transactions at 99.95% uptime using CQRS + async patterns",
      "AWS optimization → 35% cost reduction, 99.9% availability with auto-scaling",
      "95% deployment success rate, zero-downtime blue-green releases via Jenkins + Docker",
    ],
  },
  {
    role: "Frontend Software Engineer",
    company: "Vitrana",
    location: "Bangalore, India",
    period: "December 2019 – May 2021",
    current: false,
    highlights: [
      "Built 60+ screen Angular enterprise dashboards navigating 100K+ medical terms",
      "Redesigned MedDRA Dictionary → 60% search improvement, 50% faster data loads",
      "30+ reusable Angular component library → 35% development time reduction across teams",
      "Test coverage: 60% → 90% | Production bugs reduced by 35%",
    ],
  },
];

export const projects = [
  {
    name: "Career Axis",
    tagline: "AI-Powered Job Application Tracker",
    description:
      "Full-stack platform integrating Gmail API + NLP classification to automate job application tracking with ML-based email categorization.",
    stack: ["React", "TypeScript", "Node.js", "OpenAI API", "MongoDB", "Docker", "AWS"],
    metrics: { headline: "90% ML Accuracy", sub: "500+ active users · 75% less manual effort" },
    github: "https://github.com/Prudhvicharan/career-axis",
    live: "https://prudhvicharan.github.io/Career-Axis/",
    accentColor: "#00E5FF",
    gradientFrom: "#00E5FF20",
    gradientTo: "#0066FF10",
  },
  {
    name: "LaunchMasters",
    tagline: "College Application Management Platform",
    description:
      "Comprehensive platform serving students with college research, application tracking, and deadline management across 7,000+ institutions.",
    stack: ["Angular", "TypeScript", "Node.js", "MongoDB", "Redis", "Docker"],
    metrics: { headline: "1,200+ Students", sub: "7,000 institutions · 99.5% uptime" },
    github: "https://github.com/Prudhvicharan/launchmasters",
    live: "https://launchmasters.vercel.app/login",
    accentColor: "#FF9F1C",
    gradientFrom: "#FF9F1C20",
    gradientTo: "#FF450010",
  },
];

export const skills = {
  Frontend: ["React", "Angular", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Redux", "RxJS", "Microfrontends"],
  Backend: ["Node.js", "Spring Boot", ".NET Core", "Express.js", "GraphQL", "gRPC", "RESTful APIs"],
  "AI / ML": ["OpenAI API", "LangChain", "NLP", "LLM Integration", "AI Automation", "Chatbot Development"],
  "Cloud / DevOps": ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "CI/CD"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"],
  Security: ["OAuth 2.0", "JWT", "SAML", "RBAC", "Spring Security"],
  Testing: ["Jest", "Cypress", "JUnit", "Mockito", "TDD", "BDD", "SonarQube"],
  Monitoring: ["Grafana", "Prometheus", "ELK Stack", "CloudWatch"],
};

export const skillsFlat = {
  row1: ["React", "Angular", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Redux", "RxJS", "Microfrontends", "Node.js", "Express.js", "GraphQL", "gRPC"],
  row2: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "OpenAI API", "LangChain", "PostgreSQL", "MongoDB", "Redis", "Spring Boot", ".NET Core"],
};

export const education = [
  {
    degree: "Master of Science in Computer Science",
    shortDegree: "M.S. Computer Science",
    institution: "University of Missouri–Kansas City",
    location: "Kansas City, MO",
    period: "January 2023 – May 2024",
    gpa: "3.8 / 4.0",
    highlight: true,
    courses: [
      "Advanced Algorithms",
      "Distributed Systems",
      "Cloud Computing",
      "Machine Learning",
      "Database Systems",
    ],
  },
  {
    degree: "Bachelor of Technology in Software Engineering",
    shortDegree: "B.Tech Software Engineering",
    institution: "Vellore Institute of Technology",
    location: "Tamil Nadu, India",
    period: "June 2016 – June 2021",
    gpa: "8.67 / 10",
    highlight: false,
    courses: [
      "Data Structures",
      "OOP",
      "Web Development",
      "Software Architecture",
      "Database Management",
    ],
  },
];

export const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];
