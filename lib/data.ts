export const personal = {
  name: "Prudhvi Charan P",
  firstName: "PRUDHVI",
  lastName: "CHARAN",
  title: "Senior Full-Stack Engineer",
  roles: [
    "Senior Full-Stack Engineer",
    "Azure Cloud Architect",
    "Data Integration Specialist",
    "Backend Developer",
  ],
  bio: "I architect and build enterprise-grade applications that scale to solve complex real-world problems. With deep expertise across .NET/C#, Python, and modern TypeScript ecosystems, I specialize in designing robust T-SQL data models, driving cloud integrations via Azure, and leveraging Databricks for intelligent ML pipelines. I care deeply about writing rigorously tested code, mentoring engineering teams, and ensuring production systems remain highly available and reliable.",
  email: "bunnycharanprudhvi@gmail.com",
  phone: "816-762-8317",
  linkedin: "linkedin.com/in/prudhvi-charan",
  github: "github.com/Prudhvicharan",
  portfolio: "react.prudhvicharan.com",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years Experience", icon: "⚡" },
  { value: 50, suffix: "K+", label: "Users Served", icon: "👥" },
  { value: 15, suffix: "+", label: "Microservices", icon: "🌐" },
  { value: 99.9, suffix: "%", label: "Uptime Delivered", icon: "🔒" },
  { value: 90, suffix: "%+", label: "ML Accuracy", icon: "🤖" },
  { value: 95, suffix: "%+", label: "Test Coverage", icon: "✅" },
];

export const experience = [
  {
    role: "Senior Full Stack Engineer",
    company: "Akdene",
    location: "Remote",
    period: "March 2025 – Present",
    current: true,
    highlights: [
      "Developed and configured enterprise-grade web applications of moderate-to-high complexity using .NET Core/C#, Python, JavaScript/TypeScript, and Node.js.",
      "Designed and maintained T-SQL data models and schemas; authored rollback-safe migration scripts.",
      "Built and maintained Azure Pipelines CI/CD workflows for automated build, test, and deployment.",
      "Implemented Azure Service Bus as the messaging backbone for event-driven integrations.",
      "Developed Python-based ML signal scoring workflows using Databricks, applying NLP classification.",
      "Resolved tier 2 and 3 support issues across production applications; escalated complex incidents.",
      "Authored unit and integration tests (Jest, xUnit, JUnit) achieving 90%+ code coverage; created QA documentation.",
      "Effectively mentored 5 junior developers on data modeling, software configuration, and testing standards."
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Vitrana",
    location: "Bangalore, India",
    period: "June 2021 – December 2022",
    current: false,
    highlights: [
      "Led development of the HiLIT healthcare analytics platform using .NET Core/C# and SQL Server.",
      "Integrated Azure Service Bus for event-driven messaging between 20+ RESTful microservice APIs.",
      "Developed Python scripts for data ingestion, transformation, and reporting automation.",
      "Executed T-SQL/SQL database schema migrations across distributed SQL Server services.",
      "Achieved 95% unit and integration test coverage; independently authored test suites and deployment documentation.",
      "Deployed and optimized cloud infrastructure (AWS and Azure) with auto-scaling configurations."
    ],
  },
  {
    role: "Software Engineer",
    company: "Vitrana",
    location: "Bangalore, India",
    period: "December 2019 – May 2021",
    current: false,
    highlights: [
      "Developed large-scale Angular enterprise dashboards with complex routing and data visualization.",
      "Redesigned MedDRA Dictionary application; optimized T-SQL queries and refactored legacy TypeScript codebase.",
      "Configured Azure Pipelines CI/CD workflows; automated unit testing and integration testing.",
      "Wrote Python automation scripts for data reporting and batch processing tasks.",
      "Built 30+ reusable Angular component libraries using Angular Material and SCSS."
    ],
  },
];

export const projects = [
  {
    name: "Career Axis",
    tagline: "AI-Powered Job Application Tracker",
    description:
      "Full-stack application integrating a Python-based NLP/ML classification pipeline with Gmail API across 8 job-signal categories.",
    stack: ["Python", "C#/.NET", "Node.js", "React", "T-SQL/SQL", "Azure Pipelines", "Azure Service Bus", "Databricks"],
    metrics: { headline: "Advanced Pipeline", sub: "Azure & Databricks Integrated" },
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
      "Full-stack platform with integrated external REST APIs, T-SQL/SQL data modeling, and Python scripts for data normalization.",
    stack: ["Python", "Angular", "TypeScript", "T-SQL/SQL", "Node.js", "Azure Pipelines"],
    metrics: { headline: "Enterprise Scale", sub: "T-SQL/SQL Schema-Driven" },
    github: "https://github.com/Prudhvicharan/launchmasters",
    live: "https://launchmasters-prod.vercel.app",
    accentColor: "#FF9F1C",
    gradientFrom: "#FF9F1C20",
    gradientTo: "#FF450010",
  },
];

export const skills = {
  "Cloud & Azure": ["Microsoft Azure", "Azure Pipelines", "Azure Service Bus", "Azure Functions", "Logic Apps", "Docker"],
  "Data & Analytics": ["Databricks", "T-SQL/SQL", "SQL Server", "PostgreSQL", "Data Modeling", "Schema Migrations"],
  "ML & Integrations": ["Python", "Machine Learning", "NLP Classification", "Event-Driven Architecture", "RESTful APIs"],
  Frontend: ["JavaScript", "TypeScript", "React", "Angular", "Next.js", "Tailwind CSS"],
  "Backend": [".NET/C#", "Node.js", "Python", "Express.js"],
  "Testing & Quality": ["Unit Testing", "xUnit", "Jest", "JUnit", "QA Documentation", "Deployment Docs"],
  "DevOps & Support": ["Tier 2/3 Support", "Incident Escalation", "CI/CD", "Mentorship", "Software Configuration"],
};

export const skillsFlat = {
  row1: ["Python", ".NET/C#", "T-SQL/SQL", "Azure Pipelines", "Azure Service Bus", "Databricks", "JavaScript", "TypeScript", "React", "Angular", "Node.js"],
  row2: ["Machine Learning", "Unit Testing", "QA Documentation", "Tier 2/3 Support", "Mentorship", "Data Modeling", "Schema Migrations", "Docker", "CI/CD", "Event-Driven Integrations"],
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
