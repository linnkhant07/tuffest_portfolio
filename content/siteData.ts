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
  name: "Linn Khant Thuya",
  tagline:
    "SWE across backend, full-stack, and agentic systems; I design and deliver scalable systems at speed for web, mobile, and desktop.",
  location: "UCLA CS '27",
  email: "linn.thuya247@gmail.com",
  github: "https://github.com/linnkhant07",
  linkedin: "https://www.linkedin.com/in/linn-khant-thuya/",
  aboutParagraphs: [
    "I am a first-generation student at UCLA studying CS and a software engineer who learned by building and shipping in real environments.",
    "I care about building software that actually helps people, whether that is developers or general users, in real-world use cases.",
    "I move fast, iterate quickly, and keep quality high.",
    "If you have internship, full-time, mentorship, startup, or project opportunities, I'd love to connect!",
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "C", "C++", "JavaScript/TypeScript", "SQL", "Go", "Rust"],
    },
    {
      category: "Frameworks",
      items: [
        "React",
        "Next.js",
        "Node.js/Express",
        "FastAPI",
        "GraphQL",
        "ElectronJS",
        "Tailwind",
      ],
    },
    {
      category: "Data + Infrastructure",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Firebase",
        "Supabase",
        "AWS (EC2, S3)",
        "Docker",
        "Kubernetes",
        "Kafka",
        "GitHub Actions",
        "Linux",
      ],
    },
  ],
  journeyMilestones: [
    {
      id: "pcc",
      title: "Pasadena City College",
      subtitle: "Software Engineering Intern",
      period: "Feb 2024 - Apr 2024",
      description:
        "Built and shipped a cross-platform campus app with real-time data sync and performance-focused frontend optimization.",
      bullets: [
        "Built mobile app for 25,000+ students using React + Ionic",
        "Designed real-time updates with Firestore + Cloud Functions",
        "Reduced bundle size and initial load time by 35%",
      ],
      biomeStyle: "campus",
    },
    {
      id: "brightside",
      title: "Brightside Health",
      subtitle: "AI Studio Fellow",
      period: "May 2024 - Mar 2025",
      description:
        "Developed RAG and graph-based workflows that automated literature analysis for clinical teams.",
      bullets: [
        "Designed LangChain ingestion, embeddings, and retrieval pipelines",
        "Modeled relationships in Neo4j with NetworkX visualization",
        "Reduced clinician analysis time by 70%",
      ],
      biomeStyle: "lab",
    },
    {
      id: "jpl",
      title: "NASA JPL",
      subtitle: "Software Engineering Intern",
      period: "Jun 2025 - Sep 2025",
      description:
        "Built mission-scale geospatial and ML post-processing systems for planetary mapping and research operations.",
      bullets: [
        "Improved ML map accuracy by 30-40% with Python vectorization and pruning algorithms",
        "Stitched 10k+ radar tiles into a global Venus tectonic map",
        "Automated a GIS workflow that previously required 1,000+ hours",
      ],
      biomeStyle: "space",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      subtitle: "Software Engineering Intern",
      period: "Incoming Jun 2026 - Sep 2026",
      description:
        "Selected for LinkedIn's Summer 2026 software engineering intern cohort.",
      bullets: [
        "Preparing to contribute to internet-scale product systems",
        "Focused on backend and full-stack engineering growth",
        "Excited to collaborate in high-impact production environments",
      ],
      biomeStyle: "launchpad",
    },
  ],
  projects: [
    {
      slug: "kel-sel-yay-placeholder",
      name: "Kel Sel Yay - Crisis Response Platform (Placeholder)",
      oneLiner: "Real-time crisis-aid platform launched after the earthquake.",
      description:
        "Built and shipped a missing-person coordination platform after the 7.7 Thailand-Myanmar earthquake.",
      highlights: [
        "Onboarded 7.1K+ users and coordinated 18K+ missing-person reports",
        "Handled 20K+ daily queries at 99.9% uptime",
      ],
      stack: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
      links: [{ label: "GitHub", href: "https://github.com/linnkhant07" }],
    },
    {
      slug: "kel-sel-yay",
      name: "Kel Sel Yay - Crisis Response Platform",
      oneLiner: "Real-time crisis-aid platform launched after the earthquake.",
      description:
        "Built and shipped a missing-person coordination platform after the 7.7 Thailand-Myanmar earthquake.",
      highlights: [
        "Onboarded 7.1K+ users and coordinated 18K+ missing-person reports",
        "Handled 20K+ daily queries at 99.9% uptime",
      ],
      stack: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
      links: [{ label: "GitHub", href: "https://github.com/linnkhant07" }],
    },
    {
      slug: "cpp-exam-grader-app",
      name: "C++ Exam Grader App",
      oneLiner: "Secure desktop exam system used in CS classrooms.",
      description:
        "Developed an Electron-based testing platform with in-app C++ compile and run support to replace paper exams.",
      highlights: [
        "Adopted by 50% of CS classes at Pasadena City College",
        "Implemented focus lock and shortcut blocking for exam integrity",
      ],
      stack: ["ElectronJS", "Node.js", "C++", "x86 Assembly"],
      links: [{ label: "GitHub", href: "https://github.com/linnkhant07" }],
    },
    {
      slug: "underwater-rover",
      name: "Underwater Rover",
      oneLiner: "Competition rover with telemetry and control tooling.",
      description:
        "Engineered an Arduino-powered rover and Python control/visualization stack for the MATE ROV competition.",
      highlights: [
        "Ranked 13th out of 79 teams globally",
        "Achieved 95% positioning accuracy during test runs",
      ],
      stack: ["Python", "Arduino", "Pandas", "Matplotlib", "Pygame"],
      links: [{ label: "GitHub", href: "https://github.com/linnkhant07" }],
    },
    {
      slug: "underwater-rover-next",
      name: "Underwater Rover (Placeholder)",
      oneLiner: "Competition rover with telemetry and control tooling.",
      description:
        "Engineered an Arduino-powered rover and Python control/visualization stack for the MATE ROV competition.",
      highlights: [
        "Ranked 13th out of 79 teams globally",
        "Achieved 95% positioning accuracy during test runs",
      ],
      stack: ["Python", "Arduino", "Pandas", "Matplotlib", "Pygame"],
      links: [{ label: "GitHub", href: "https://github.com/linnkhant07" }],
    },
  ],
  experience: [
    {
      org: "LinkedIn",
      role: "Software Engineering Intern",
      period: "Incoming Jun 2026 - Sep 2026",
      bullets: [
        "Selected for the Summer 2026 software engineering intern cohort",
        "Preparing to contribute to large-scale production systems",
      ],
    },
    {
      org: "NASA Jet Propulsion Laboratory (JPL)",
      role: "Software Engineering Intern",
      period: "Jun 2025 - Sep 2025",
      bullets: [
        "Built geospatial post-processing pipelines for 10GB+ ML segmentation outputs",
        "Improved map accuracy by 30-40% with skeletonization and vectorization algorithms",
        "Automated GIS workflows, saving 1,000+ hours for mission scientists",
        "Built a Next.js + MongoDB metadata app adopted by 100+ researchers",
      ],
    },
    {
      org: "Brightside Health (Break Through Tech AI Program)",
      role: "AI Studio Fellow",
      period: "May 2024 - Mar 2025",
      bullets: [
        "Built a Python RAG pipeline for structured extraction from clinical papers",
        "Implemented semantic retrieval workflows using LangChain",
        "Modeled entities in Neo4j with interactive NetworkX visualizations",
        "Reduced clinician literature analysis time by 70%",
      ],
    },
    {
      org: "Pasadena City College",
      role: "Software Engineering Intern",
      period: "Feb 2024 - Apr 2024",
      bullets: [
        "Built a React + Ionic mobile app for campus resources serving 25,000+ students",
        "Implemented low-latency real-time sync using Firestore and Cloud Functions",
        "Reduced initial load time by 35% with lazy-loading and RxJS state management",
        "Integrated Firebase Cloud Messaging and REST APIs for engagement automation",
      ],
    },
  ],
};
