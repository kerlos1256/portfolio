export interface FreelancerData {
  name: string;
  title: string;
  location: string;
  bio: string;
  stats: {
    jobSuccess: string;
    yearsExp: string;
    rating: string;
  };
  skills: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
    ai: string[];
  };
  experience: {
    title: string;
    description: string;
  }[];
  rates: {
    hourly?: string;
    notes?: string;
  };
  availability: string;
  contact: {
    email?: string;
    upworkUrl?: string;
  };
  languages: {
    name: string;
    level: string;
  }[];
  reviews: {
    text: string;
    client?: string;
  }[];
  whatISolve: {
    title: string;
    description: string;
  }[];
}

export const freelancerData: FreelancerData = {
  name: "Kerlos G.",
  title: "Senior Full Stack Architect · Next.js · SaaS · AI",
  location: "Cairo, Egypt",
  bio: "I build high-performance, scalable applications that hold up under real pressure — from FinTech APIs to AI-integrated SaaS platforms, turning complex requirements into clean production code.",
  stats: {
    jobSuccess: "100%",
    yearsExp: "5+",
    rating: "5.0",
  },
  skills: {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux / Zustand"],
    backend: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "GraphQL", "WebSockets"],
    infrastructure: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel"],
    ai: ["LLM / AI Apps", "AI Chatbots", "Twilio API", "REST / GraphQL APIs"],
  },
  experience: [
    {
      title: "Senior Full Stack Engineer",
      description: "Built and maintained complex SaaS platforms, FinTech APIs, and AI-integrated applications for clients across multiple industries.",
    },
  ],
  rates: {
    hourly: "Contact for rates",
    notes: "Available for both short-term projects and long-term engagements.",
  },
  availability: "Open to work — available for new projects and long-term engagements.",
  contact: {
    email: "",
    upworkUrl: "",
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Arabic", level: "Native" },
  ],
  reviews: [
    {
      text: "Your expertise in TypeScript, React.js, and Next.js has been outstanding, and your progress has been impressive. I have truly enjoyed working with you and appreciate your excellent contributions.",
    },
    {
      text: "Kerlos is a very talented programmer. I really enjoyed working with him. He advanced our project greatly and consistently brought strong technical thinking to every challenge.",
    },
    {
      text: "Kerlos has been an incredible source of assistance, completing every task with ease. I started giving him increasingly challenging tasks just to test his limits — he delivered every time.",
    },
    {
      text: "He worked on the project for over a year and a half. A dedicated professional who stays committed throughout the full engagement — not just the early stages.",
    },
  ],
  whatISolve: [
    {
      title: "Performance",
      description: "Slow MVP? I optimize load times and database queries until your app is fast under real load.",
    },
    {
      title: "AI Integration",
      description: "Adding LLMs and AI features into your existing TypeScript stack cleanly and reliably.",
    },
    {
      title: "Scale",
      description: "NestJS/Node backend struggling? I architect systems designed to handle real user growth.",
    },
  ],
};
