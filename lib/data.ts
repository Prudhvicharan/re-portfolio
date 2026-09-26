export const personal = {
  "name": "Prudhvi Charan P",
  "firstName": "PRUDHVI",
  "lastName": "CHARAN",
  "title": "Full-Stack Application Developer",
  "roles": [
    "Application Developer II at HNTB",
    "Data Engineering · Databricks · SQL Server"
  ],
  "bio": "I build and support applications across .NET/C#, SQL, Python, and TypeScript. At HNTB, my work focuses on data engineering with Databricks and Medallion Architecture, with Azure Synapse in scope.",
  "email": "bunnycharanprudhvi@gmail.com",
  "phone": "816-762-8317",
  "linkedin": "https://www.linkedin.com/in/prudhvi-charan",
  "github": "https://github.com/Prudhvicharan",
  "portfolio": "https://prudhvicharan.com"
};

export const experience = [
  {
    "role": "Application Developer II",
    "company": "HNTB",
    "location": "Kansas City, Missouri · On-site",
    "period": "July 2026 – Present",
    "employment": "Full-time",
    "current": true,
    "highlights": [
      "Data engineering on HNTB’s Databricks/Medallion Architecture stack, with Azure Synapse in scope.",
      "Leading investigation and implementation on a database-wide job-number reclamation initiative spanning five production SQL Server databases: full column-level data auditing (6,000+ columns per database), cross-database join verification against master tables, and design of a table-driven stored procedure for safe number reuse.",
      "Collaborating with technical leads and business stakeholders to scope implementation approach, including stored procedure redesign in a Git-based development workflow."
    ]
  },
  {
    "role": "Senior Full Stack Engineer",
    "company": "Akdene",
    "location": "Remote",
    "period": "March 2025 – June 2026",
    "employment": "",
    "current": false,
    "highlights": [
      "Developed .NET Core/C#, Python, TypeScript, and Node.js applications supporting 50,000+ users across healthcare and recruitment domains with 99.9% uptime.",
      "Designed T-SQL data models across 15+ distributed services and authored rollback-safe migrations, with end-to-end test ownership and no dedicated QA team.",
      "Built Azure Pipelines workflows and blue-green deployments enabling 50+ weekly production releases with automated rollback.",
      "Implemented Azure Service Bus integrations and Python ML workflows in Databricks, classifying signals across eight categories at 90%+ accuracy.",
      "Resolved tier 2/3 production issues, authored tests achieving 90%+ coverage, and maintained deployment documentation and QA checklists.",
      "Built Prometheus, Grafana, and ELK dashboards, reducing MTTD by 60% and MTTR by 45%; mentored five junior developers."
    ]
  },
  {
    "role": "Senior Software Engineer",
    "company": "Vitrana",
    "location": "Bangalore, India",
    "period": "June 2021 – December 2022",
    "employment": "",
    "current": false,
    "highlights": [
      "Led development of the HiLIT healthcare analytics platform using .NET Core/C# and SQL Server, with queries, indexing, migrations, and reporting views across 5M+ adverse event records serving 2,000+ B2B users globally.",
      "Built 20+ RESTful microservice APIs with ASP.NET Core and integrated Azure Service Bus for event-driven messaging.",
      "Developed Python scripts for ingestion, transformation, and reporting; collaborated with data teams on ML integration and feature engineering.",
      "Executed rollback-safe T-SQL/SQL schema migrations across distributed SQL Server services for zero-downtime deployments.",
      "Achieved 95% unit and integration test coverage as sole QA owner; authored test suites and deployment documentation, reducing production defects by 40%.",
      "Optimized AWS and Azure infrastructure with auto-scaling, reducing costs 35% while maintaining 99.9% application availability."
    ]
  },
  {
    "role": "Software Engineer",
    "company": "Vitrana",
    "location": "Bangalore, India",
    "period": "December 2019 – May 2021",
    "employment": "",
    "current": false,
    "highlights": [
      "Developed Angular enterprise dashboards with 60+ screens, supporting navigation of 100K+ medical terminology records for pharmaceutical and regulatory clients.",
      "Redesigned the MedDRA Dictionary application: improved search performance by 60% and reduced data load time by 50% through T-SQL optimization, server-side pagination, and refactoring an approximately 80K-line legacy JavaScript codebase.",
      "Replaced legacy GitLab pipelines with Azure Pipelines and automated testing and SonarQube quality gates, increasing test coverage from 60% to 90% and reducing production bugs by 35%.",
      "Wrote Python reporting and batch-processing scripts, reducing manual data preparation effort by 40%.",
      "Built 30+ reusable Angular component libraries with Angular Material and SCSS, reducing development time by 35% across enterprise applications."
    ]
  }
];

export const projects = [
  {
    "name": "Career Axis",
    "tagline": "AI-Powered Job Application Tracker",
    "problem": "Tracking job applications manually across email requires repeated review and categorization.",
    "role": "Designed a full-stack Gmail integration with tiered classification: rules, subject-level AI, then a full-body model fallback. Built Databricks ingestion workflows and asynchronous routing with Azure Service Bus.",
    "outcome": "500+ active users; 90%+ classification accuracy across eight job-signal categories; 75% less manual tracking effort.",
    "stack": [
      "Python",
      "C#/.NET",
      "React / TypeScript",
      "Gmail API",
      "OpenAI API",
      "T-SQL/SQL",
      "Databricks",
      "Azure Service Bus",
      "Docker"
    ],
    "github": "https://github.com/Prudhvicharan/career-axis",
    "live": "https://prudhvicharan.github.io/Career-Axis/"
  },
  {
    "name": "LaunchMasters",
    "tagline": "College Application Management Platform",
    "problem": "Students need searchable institution data and a structured way to manage college applications.",
    "role": "Developed a full-stack platform with external REST API integrations, filtering, pagination, Redis caching, and Python normalization and import scripts. Built a Node.js/Express backend with T-SQL/SQL schema-driven modeling.",
    "outcome": "1,200+ students and data for 7,000+ institutions; backend supporting 500+ concurrent users at 99.5% uptime; 85% test coverage.",
    "stack": [
      "Python",
      "Angular",
      "TypeScript",
      "Node.js / Express",
      "T-SQL/SQL",
      "MongoDB",
      "Redis",
      "Azure Pipelines"
    ],
    "github": "https://github.com/Prudhvicharan/launchmasters",
    "live": "https://launchmasters-prod.vercel.app"
  }
];

export const skills = {
  "Languages & Core": [
    "C# / .NET Core",
    "T-SQL / SQL",
    "Python",
    "JavaScript / TypeScript",
    "Java / Spring Boot",
    "Node.js"
  ],
  "Cloud & Data": [
    "Azure Pipelines",
    "Azure Service Bus",
    "Azure Functions",
    "Azure App Service",
    "Logic Apps",
    "Databricks",
    "Medallion Architecture",
    "SQL Server",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "AWS"
  ],
  "Frontend": [
    "React / Redux Toolkit",
    "Angular / RxJS / NgRx",
    "Next.js",
    "Tailwind CSS",
    "Module Federation"
  ],
  "ML & Integrations": [
    "NLP classification",
    "OpenAI GPT-4",
    "LangChain",
    "Kafka",
    "RESTful APIs",
    "GraphQL"
  ],
  "Testing & Delivery": [
    "xUnit / NUnit",
    "JUnit",
    "Jest",
    "TDD / BDD",
    "Docker / Kubernetes",
    "Terraform",
    "GitHub Actions",
    "Jenkins",
    "GitLab CI/CD",
    "SonarQube"
  ],
  "Operations": [
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "Tier 2/3 support",
    "QA / deployment documentation",
    "Mentoring"
  ]
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
    courses: [],
  },
];

export const navItems = [
  {
    "label": "About",
    "id": "about"
  },
  {
    "label": "Projects",
    "id": "projects"
  },
  {
    "label": "Skills",
    "id": "skills"
  },
  {
    "label": "Experience",
    "id": "experience"
  },
  {
    "label": "Education",
    "id": "education"
  },
  {
    "label": "Contact",
    "id": "contact"
  }
];

