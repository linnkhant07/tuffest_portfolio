export type SocialLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type JourneyMilestone = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  bullets: string[];
  links?: SocialLink[];
  biomeStyle: "campus" | "studio" | "lab" | "launchpad" | "summit" | "space";
};

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: SocialLink[];
};

export type ExperienceItem = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};

export type SiteData = {
  name: string;
  tagline: string;
  location?: string;
  email: string;
  github: string;
  linkedin: string;
  aboutParagraphs: string[];
  skills: SkillGroup[];
  journeyMilestones: JourneyMilestone[];
  projects: Project[];
  experience: ExperienceItem[];
};

export const siteData: SiteData = {
  name: "Your Name",
  tagline: "Designing resilient products where clear UX meets serious engineering.",
  location: "Remote / Open to relocation",
  email: "you@example.com",
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  aboutParagraphs: [
    "I build software that feels calm on the surface and rigorous under the hood. My best work sits at the intersection of product intuition, distributed systems thinking, and clear communication.",
    "I enjoy ambiguous problems, quick validation loops, and measurable outcomes. From early prototypes to production rollout, I focus on reducing complexity for users while preserving flexibility for teams.",
    "Outside shipping features, I mentor junior engineers, document decision trade-offs, and push for engineering cultures that value speed with discipline.",
  ],
  skills: [
    {
      category: "Product Engineering",
      items: ["TypeScript", "React", "Next.js", "Design Systems", "Accessibility"],
    },
    {
      category: "Data + ML",
      items: ["Python", "LLM Integrations", "Vector Search", "Evaluation Loops"],
    },
    {
      category: "Infrastructure",
      items: ["Node.js", "PostgreSQL", "Redis", "CI/CD", "Observability"],
    },
  ],
  journeyMilestones: [
    {
      id: "foundation",
      title: "Systems Thinking Foundation",
      subtitle: "Computer Science + Human-Centered Design",
      period: "2018 - 2020",
      description:
        "Built core habits in problem decomposition, experimentation, and communicating technical ideas to non-technical stakeholders.",
      bullets: [
        "Led cross-disciplinary student teams on product sprints",
        "Published practical design-to-code handoff templates",
        "Built first full-stack apps with measurable user feedback",
      ],
      biomeStyle: "campus",
    },
    {
      id: "maker",
      title: "Product Builder Phase",
      subtitle: "Startup Studio",
      period: "2020 - 2022",
      description:
        "Moved from shipping features to shipping outcomes, balancing speed, quality, and product direction in early-stage environments.",
      bullets: [
        "Reduced onboarding friction by 35% through UX and API redesign",
        "Established reusable UI and API patterns across teams",
        "Partnered with founders on roadmap and KPI instrumentation",
      ],
      links: [{ label: "Case Study", href: "#" }],
      biomeStyle: "studio",
    },
    {
      id: "deepwork",
      title: "Applied ML + Platform Work",
      subtitle: "Research and Infrastructure",
      period: "2022 - 2024",
      description:
        "Designed internal platforms that turned ML experiments into reliable product capabilities for real users.",
      bullets: [
        "Built evaluation pipelines for prompt and retrieval quality",
        "Improved p95 latency by 42% with caching and query tuning",
        "Created observability dashboards used in weekly product reviews",
      ],
      links: [{ label: "Architecture Notes", href: "#" }],
      biomeStyle: "lab",
    },
    {
      id: "impact",
      title: "Leading End-to-End Delivery",
      subtitle: "Senior Product Engineer",
      period: "2024 - Present",
      description:
        "Owning full lifecycle delivery: discovery, architecture, implementation, rollout, and post-launch iteration.",
      bullets: [
        "Shipped high-stakes features used by enterprise clients",
        "Introduced lightweight RFC process for faster alignment",
        "Mentored engineers on product-first technical decisions",
      ],
      links: [
        { label: "Live Product", href: "#" },
        { label: "Talk", href: "#" },
      ],
      biomeStyle: "launchpad",
    },
  ],
  projects: [
    {
      slug: "signal-hub",
      name: "Signal Hub",
      oneLiner: "Unified insight console for product and support teams.",
      description:
        "Aggregates qualitative and quantitative feedback to prioritize roadmap decisions with confidence.",
      highlights: [
        "Merged support + analytics streams into one searchable workspace",
        "Cut triage time with auto-grouped issue signals",
      ],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI"],
      links: [
        { label: "GitHub", href: "#" },
        { label: "Live", href: "#" },
      ],
    },
    {
      slug: "ops-lens",
      name: "Ops Lens",
      oneLiner: "Operational dashboard for distributed engineering squads.",
      description:
        "Tracks deployment health, lead time, and incident trends in one fast interface for engineering leaders.",
      highlights: [
        "Real-time release health feed with anomaly highlights",
        "Actionable weekly summaries for planning rituals",
      ],
      stack: ["React", "Node.js", "Redis", "Grafana"],
      links: [
        { label: "GitHub", href: "#" },
        { label: "Demo", href: "#" },
      ],
    },
    {
      slug: "briefcraft",
      name: "BriefCraft",
      oneLiner: "AI-assisted product brief generator for PM teams.",
      description:
        "Converts interview notes and metrics into structured product briefs with clear assumptions and risks.",
      highlights: [
        "Improved draft quality with domain-specific prompt templates",
        "Enabled export-ready docs with consistent voice",
      ],
      stack: ["Next.js", "Tailwind", "Framer Motion", "Vercel"],
      links: [
        { label: "GitHub", href: "#" },
        { label: "Live", href: "#" },
      ],
    },
  ],
  experience: [
    {
      org: "Northstar Labs",
      role: "Senior Product Engineer",
      period: "2024 - Present",
      bullets: [
        "Own architecture and delivery of customer-facing AI workflows",
        "Led migration to modular frontend architecture with shared patterns",
        "Partner directly with design and GTM on enterprise feature launches",
      ],
    },
    {
      org: "Orbit Studio",
      role: "Product Engineer",
      period: "2021 - 2024",
      bullets: [
        "Built full-stack features from discovery to production rollout",
        "Designed instrumentation that improved roadmap confidence",
        "Reduced defect escape rate with CI and release checklist upgrades",
      ],
    },
    {
      org: "Open Source + Freelance",
      role: "Frontend Engineer",
      period: "2019 - 2021",
      bullets: [
        "Delivered web experiences for early-stage teams and nonprofits",
        "Contributed accessibility and DX improvements to OSS libraries",
        "Created reusable starter kits adopted by community builders",
      ],
    },
  ],
};
