export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
}

export const blogData: BlogPost[] = [
  {
    id: "ai-production-lessons",
    title: "Lessons from Building AI Systems at Scale",
    date: "2024-09-15",
    summary: "Key insights from deploying machine learning models in production environments, including monitoring, versioning, and handling model drift.",
    content: `Building AI systems that work in production is vastly different from creating
models in notebooks. Here are the key lessons I've learned:

1. Monitoring is Critical
   - Track model performance metrics in real-time
   - Set up alerts for distribution drift
   - Monitor infrastructure health alongside model health

2. Version Everything
   - Models, data, code, and configurations
   - Reproducibility is essential for debugging
   - Enable rollback capabilities

3. Handle Failure Gracefully
   - Models will fail—plan for it
   - Implement fallback strategies
   - Design systems to degrade gracefully

4. Iterate Based on Real Data
   - Production data often differs from training data
   - Establish feedback loops
   - Continuously retrain and improve

The gap between research and production is where real engineering happens.`,
    tags: ["AI/ML", "Production", "Engineering"]
  },
  {
    id: "distributed-systems-reliability",
    title: "Building Reliable Distributed Systems",
    date: "2024-07-22",
    summary: "Practical approaches to building distributed systems that are both scalable and reliable, learned from years of experience.",
    content: `Distributed systems are hard. Here's what I've learned about building
systems that actually work in production:

1. Embrace Failure
   - Assume everything will fail
   - Design for partial failures
   - Use timeouts and circuit breakers

2. Keep It Simple
   - Complexity is the enemy of reliability
   - Avoid unnecessary distributed transactions
   - Use proven patterns

3. Observe Everything
   - Comprehensive logging and tracing
   - Distributed tracing across services
   - Metrics that matter

4. Test Failure Scenarios
   - Chaos engineering in production
   - Regular disaster recovery drills
   - Load testing beyond expected capacity

Reliability isn't an accident—it's engineered through deliberate design choices.`,
    tags: ["Distributed Systems", "Reliability", "Architecture"]
  },
  {
    id: "developer-experience",
    title: "Why Developer Experience Matters",
    date: "2024-05-10",
    summary: "Developer experience is not a luxury—it's a competitive advantage that directly impacts product quality and team velocity.",
    content: `Great developer experience (DX) isn't about making developers happy—though
that's a nice side effect. It's about removing friction that slows down delivery
and introduces bugs.

Key Areas of Focus:

1. Fast Feedback Loops
   - Quick build times
   - Rapid test execution
   - Instant deployment to dev environments

2. Clear Documentation
   - Code that explains itself
   - Up-to-date API docs
   - Runnable examples

3. Powerful Tooling
   - IDE integration
   - CLI tools for common tasks
   - Automation of repetitive work

4. Local Development Parity
   - Development environment matches production
   - Easy onboarding for new team members
   - Minimal setup friction

When developers can focus on solving problems instead of fighting tools,
everyone wins—including customers.`,
    tags: ["Developer Experience", "Productivity", "Culture"]
  }
];
