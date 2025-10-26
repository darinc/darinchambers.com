export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  impact?: string;
  year: string;
}

export const portfolioData: Project[] = [
  {
    id: "ai-ml-systems",
    title: "AI/ML Production Systems",
    description: "Designed and deployed large-scale machine learning systems for real-time inference and model training pipelines.",
    technologies: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "AWS"],
    impact: "Processed millions of predictions daily with 99.9% uptime",
    year: "2020-Present"
  },
  {
    id: "distributed-platform",
    title: "Distributed Computing Platform",
    description: "Architected and built a distributed computing platform handling high-throughput data processing across multiple data centers.",
    technologies: ["Go", "Kafka", "Redis", "PostgreSQL", "Docker"],
    impact: "Reduced processing time by 10x while cutting infrastructure costs by 40%",
    year: "2018-2020"
  },
  {
    id: "developer-tools",
    title: "Developer Productivity Tools",
    description: "Created suite of developer tools that streamlined workflows and improved team productivity.",
    technologies: ["TypeScript", "Node.js", "React", "CLI Tools"],
    impact: "Adopted by 500+ developers, saving ~2 hours per developer per week",
    year: "2016-2018"
  },
  {
    id: "enterprise-architecture",
    title: "Enterprise System Modernization",
    description: "Led modernization effort of legacy enterprise systems to cloud-native architecture.",
    technologies: ["Java", "Spring", "Microservices", "Azure", "Jenkins"],
    impact: "Migrated 50+ services with zero downtime, improved deployment frequency by 5x",
    year: "2014-2016"
  }
];
