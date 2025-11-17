export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  impact?: string;
  year: string;
  order: number;
  tags?: string[];
}
