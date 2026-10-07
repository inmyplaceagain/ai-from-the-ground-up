export type LearningPath = "developer" | "designer" | "product";

export type Chapter = {
  slug: string;
  title: string;
  part: number;
  order: number;
  description: string;
  paths: LearningPath[];
};

export type Part = {
  number: number;
  title: string;
  subtitle: string;
  slug: string;
  chapters: Chapter[];
};

export const PARTS: Part[] = [
  {
    number: 0,
    title: "The Bridge",
    subtitle: "You already know more than you think",
    slug: "bridge",
    chapters: [
      {
        slug: "ai-through-webdev-lens",
        title: "AI Through a Web Dev Lens",
        part: 0,
        order: 1,
        description: "Mapping concepts you already know to AI equivalents",
        paths: ["developer", "designer", "product"],
      },
      {
        slug: "python-for-js-devs",
        title: "Python for JS/TS Developers",
        part: 0,
        order: 2,
        description: "A fast primer for JavaScript developers",
        paths: ["developer"],
      },
      {
        slug: "dev-environment",
        title: "Your Dev Environment",
        part: 0,
        order: 3,
        description: "Setting up Python, Jupyter, and your tools",
        paths: ["developer"],
      },
    ],
  },
  {
    number: 1,
    title: "Classical AI",
    subtitle: "Where it all started",
    slug: "classical-ai",
    chapters: [
      {
        slug: "what-is-ai",
        title: "What Is AI?",
        part: 1,
        order: 1,
        description: "The big picture, from Turing to today",
        paths: ["developer", "designer", "product"],
      },
      {
        slug: "expert-systems",
        title: "Expert Systems & Knowledge Representation",
        part: 1,
        order: 2,
        description: "Rule-based systems and why they hit a ceiling",
        paths: ["developer", "product"],
      },
    ],
  },
  {
    number: 2,
    title: "Machine Learning",
    subtitle: "Teaching computers to learn from data",
    slug: "machine-learning",
    chapters: [
      {
        slug: "from-rules-to-data",
        title: "From Rules to Data",
        part: 2,
        order: 1,
        description: "The paradigm shift",
        paths: ["developer", "designer", "product"],
      },
      {
        slug: "regression",
        title: "Supervised Learning: Regression",
        part: 2,
        order: 2,
        description: "Predicting numbers",
        paths: ["developer"],
      },
      {
        slug: "classification",
        title: "Supervised Learning: Classification",
        part: 2,
        order: 3,
        description: "Predicting categories",
        paths: ["developer"],
      },
      {
        slug: "unsupervised",
        title: "Unsupervised Learning",
        part: 2,
        order: 4,
        description: "When you don't have labels",
        paths: ["developer", "designer"],
      },
      {
        slug: "ml-workflow",
        title: "The ML Workflow",
        part: 2,
        order: 5,
        description: "Train, test, evaluate, repeat",
        paths: ["developer", "product"],
      },
    ],
  },
  {
    number: 3,
    title: "Neural Networks",
    subtitle: "Building a brain, one neuron at a time",
    slug: "neural-networks",
    chapters: [
      {
        slug: "the-perceptron",
        title: "The Perceptron",
        part: 3,
        order: 1,
        description: "A single artificial neuron",
        paths: ["developer", "designer"],
      },
      {
        slug: "activation-functions",
        title: "Activation Functions",
        part: 3,
        order: 2,
        description: "Why non-linearity matters",
        paths: ["developer"],
      },
      {
        slug: "multi-layer-networks",
        title: "Multi-Layer Networks",
        part: 3,
        order: 3,
        description: "Hidden layers and the forward pass",
        paths: ["developer"],
      },
      {
        slug: "backpropagation",
        title: "Backpropagation & Gradient Descent",
        part: 3,
        order: 4,
        description: "How networks learn",
        paths: ["developer"],
      },
    ],
  },
  {
    number: 4,
    title: "Deep Learning",
    subtitle: "When networks get deep, things get interesting",
    slug: "deep-learning",
    chapters: [
      {
        slug: "cnns",
        title: "CNNs: How Computers See",
        part: 4,
        order: 1,
        description: "Convolutions, feature maps, pooling",
        paths: ["developer", "designer"],
      },
      {
        slug: "rnns",
        title: "RNNs: Sequences and Memory",
        part: 4,
        order: 2,
        description: "Processing text and time series",
        paths: ["developer"],
      },
      {
        slug: "lstms",
        title: "LSTMs & GRUs",
        part: 4,
        order: 3,
        description: "Solving the memory problem",
        paths: ["developer"],
      },
      {
        slug: "the-transformer",
        title: "The Transformer",
        part: 4,
        order: 4,
        description: "The architecture that changed everything",
        paths: ["developer", "designer", "product"],
      },
      {
        slug: "autoencoders",
        title: "Autoencoders",
        part: 4,
        order: 5,
        description: "Compressing and reconstructing data",
        paths: ["developer"],
      },
    ],
  },
  {
    number: 5,
    title: "Generative AI",
    subtitle: "From understanding to creating",
    slug: "generative-ai",
    chapters: [
      {
        slug: "how-llms-work",
        title: "How LLMs Work",
        part: 5,
        order: 1,
        description: "GPT architecture, tokenization, embeddings",
        paths: ["developer", "designer", "product"],
      },
      {
        slug: "training-llms",
        title: "Training LLMs",
        part: 5,
        order: 2,
        description: "Pre-training, fine-tuning, RLHF",
        paths: ["developer", "product"],
      },
      {
        slug: "using-llms",
        title: "Using LLMs",
        part: 5,
        order: 3,
        description: "Temperature, sampling, prompt engineering",
        paths: ["developer", "designer", "product"],
      },
      {
        slug: "diffusion-models",
        title: "Diffusion Models",
        part: 5,
        order: 4,
        description: "How image generation works",
        paths: ["developer", "designer"],
      },
      {
        slug: "vaes-multimodal",
        title: "VAEs & Multimodal Models",
        part: 5,
        order: 5,
        description: "The convergence toward multimodal",
        paths: ["developer"],
      },
    ],
  },
  {
    number: 6,
    title: "Agentic AI",
    subtitle: "AI that does things",
    slug: "agentic-ai",
    chapters: [
      {
        slug: "from-chat-to-agents",
        title: "From Chat to Agents",
        part: 6,
        order: 1,
        description: "What makes an agent an agent",
        paths: ["developer", "product"],
      },
      {
        slug: "memory-and-context",
        title: "Memory & Context",
        part: 6,
        order: 2,
        description: "RAG, vector stores, context windows",
        paths: ["developer", "product"],
      },
      {
        slug: "planning-and-reasoning",
        title: "Planning & Reasoning",
        part: 6,
        order: 3,
        description: "Chain-of-thought and task decomposition",
        paths: ["developer"],
      },
      {
        slug: "multi-agent-systems",
        title: "Multi-Agent Systems",
        part: 6,
        order: 4,
        description: "Orchestration, delegation, specialisation",
        paths: ["developer"],
      },
      {
        slug: "responsible-agents",
        title: "Building Responsible Agents",
        part: 6,
        order: 5,
        description: "Governance, safety, human-in-the-loop",
        paths: ["developer", "product"],
      },
    ],
  },
  {
    number: 7,
    title: "Your Role + AI",
    subtitle: "How AI changes your actual work",
    slug: "your-role",
    chapters: [
      {
        slug: "designer",
        title: "Designer",
        part: 7,
        order: 1,
        description: "AI as creative partner, not replacement",
        paths: ["designer"],
      },
      {
        slug: "frontend-developer",
        title: "Frontend Developer",
        part: 7,
        order: 2,
        description: "Component generation, design-to-code, accessibility",
        paths: ["developer"],
      },
      {
        slug: "backend-developer",
        title: "Backend Developer",
        part: 7,
        order: 3,
        description: "APIs, databases, and migrations with AI",
        paths: ["developer"],
      },
      {
        slug: "mobile-developer",
        title: "Mobile Developer",
        part: 7,
        order: 4,
        description: "On-device models and AI-native apps",
        paths: ["developer"],
      },
      {
        slug: "qa-engineer",
        title: "QA Engineer",
        part: 7,
        order: 5,
        description: "Agentic testing and automated verification",
        paths: ["developer"],
      },
      {
        slug: "devops-sre",
        title: "DevOps & SRE",
        part: 7,
        order: 6,
        description: "AI incident response and infrastructure",
        paths: ["developer"],
      },
      {
        slug: "data-analyst",
        title: "Data Analyst",
        part: 7,
        order: 7,
        description: "Natural language analytics and automated insights",
        paths: ["developer", "product"],
      },
      {
        slug: "product-manager",
        title: "Product Manager",
        part: 7,
        order: 8,
        description: "AI-first specs, research, and roadmapping",
        paths: ["product"],
      },
    ],
  },
];

export function getPartBySlug(slug: string) {
  return PARTS.find((p) => p.slug === slug);
}

export function getChapter(partSlug: string, chapterSlug: string) {
  const part = PARTS.find((p) => p.slug === partSlug);
  if (!part) return undefined;
  const chapter = part.chapters.find((c) => c.slug === chapterSlug);
  return chapter ? { ...chapter, partTitle: part.title } : undefined;
}

export function getAllChapters() {
  return PARTS.flatMap((p) =>
    p.chapters.map((c) => ({ ...c, partSlug: p.slug, partTitle: p.title }))
  );
}

export function getAdjacentChapters(partSlug: string, chapterSlug: string) {
  const all = getAllChapters();
  const idx = all.findIndex(
    (c) => c.partSlug === partSlug && c.slug === chapterSlug
  );
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export const PART_COLORS: Record<number, string> = {
  0: "var(--color-part-0)",
  1: "var(--color-part-1)",
  2: "var(--color-part-2)",
  3: "var(--color-part-3)",
  4: "var(--color-part-4)",
  5: "var(--color-part-5)",
  6: "var(--color-part-6)",
  7: "var(--color-part-7)",
};
