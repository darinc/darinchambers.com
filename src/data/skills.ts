export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    skills: [
      "TensorFlow / PyTorch",
      "LLMs & Generative AI",
      "Model Deployment & MLOps",
      "Computer Vision",
      "NLP & Language Models",
      "Reinforcement Learning"
    ]
  },
  {
    category: "Programming Languages",
    skills: [
      "TypeScript / JavaScript",
      "Python",
      "Go",
      "Java",
      "Rust",
      "SQL"
    ]
  },
  {
    category: "Cloud & Infrastructure",
    skills: [
      "AWS / Azure / GCP",
      "Kubernetes / Docker",
      "Terraform / Infrastructure as Code",
      "CI/CD Pipelines",
      "Monitoring & Observability",
      "Distributed Systems"
    ]
  },
  {
    category: "Frameworks & Tools",
    skills: [
      "React / Next.js",
      "Node.js / Express",
      "FastAPI / Flask",
      "Spring Boot",
      "Apache Kafka",
      "Redis / PostgreSQL / MongoDB"
    ]
  },
  {
    category: "Architecture & Design",
    skills: [
      "Microservices Architecture",
      "Event-Driven Systems",
      "Domain-Driven Design",
      "API Design (REST / GraphQL)",
      "System Design at Scale",
      "Security Best Practices"
    ]
  },
  {
    category: "Leadership & Process",
    skills: [
      "Technical Leadership",
      "Team Building & Mentoring",
      "Agile / Scrum",
      "Code Review & Best Practices",
      "Technical Strategy",
      "Cross-functional Collaboration"
    ]
  }
];
