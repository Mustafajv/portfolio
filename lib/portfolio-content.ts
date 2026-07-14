export type PortfolioProject = {
  name: string;
  description: string;
  stack: readonly string[];
};

export type PortfolioContent = {
  identity: {
    firstName: string;
    availability: string;
  };
  hero: {
    eyebrow: string;
    intro: string;
  };
  projects: readonly PortfolioProject[];
  capabilities: readonly {
    title: string;
    description: string;
  }[];
  manifesto: {
    headline: string;
    copy: string;
  };
  process: readonly {
    title: string;
    description: string;
  }[];
  contact: {
    label: string;
    url: string | null;
  };
};

export const portfolioContent: PortfolioContent = {
  identity: {
    firstName: "NAME",
    availability: "Available for select projects",
  },
  hero: {
    eyebrow: "Full-stack developer",
    intro:
      "From sharp interfaces to reliable systems, I turn ambitious concepts into fast, maintainable web products built to move.",
  },
  projects: [
    {
      name: "Relay",
      description:
        "A collaboration platform concept that turns scattered conversations, decisions, and momentum into one focused workspace.",
      stack: ["Next.js", "Node.js", "PostgreSQL"],
    },
    {
      name: "Lumen",
      description:
        "A commerce experience concept designed around fast discovery, decisive storytelling, and a frictionless path to purchase.",
      stack: ["React", "TypeScript", "Commerce API"],
    },
    {
      name: "Atlas",
      description:
        "An operations platform concept that brings live workflows, permissions, and reporting into one calm, legible system.",
      stack: ["Next.js", "API design", "Realtime"],
    },
  ],
  capabilities: [
    {
      title: "Full-stack delivery",
      description:
        "Product thinking, technical direction, and implementation from the first sketch through a production-ready release.",
    },
    {
      title: "Frontend systems",
      description:
        "Fast, accessible interfaces with clear interaction patterns, resilient components, and details that hold up at every screen size.",
    },
    {
      title: "Backend & integrations",
      description:
        "Practical APIs, data models, authentication, and service integrations designed to stay understandable as the product grows.",
    },
  ],
  manifesto: {
    headline: "Clear thinking. Sharp execution. No handoff gap.",
    copy:
      "I work across interface and infrastructure, keeping the original idea intact while turning it into something people can actually use. Fewer layers. Faster decisions. Better products.",
  },
  process: [
    {
      title: "Align",
      description:
        "Define the real problem, the audience, and the smallest outcome worth shipping.",
    },
    {
      title: "Architect",
      description:
        "Turn uncertainty into a clear experience, technical shape, and delivery path.",
    },
    {
      title: "Build",
      description:
        "Create the product in tight, visible increments with quality built into the system.",
    },
    {
      title: "Refine",
      description:
        "Test the edges, sharpen the details, and leave behind a product ready to evolve.",
    },
  ],
  contact: {
    label: "Connect on LinkedIn",
    url: null,
  },
};
