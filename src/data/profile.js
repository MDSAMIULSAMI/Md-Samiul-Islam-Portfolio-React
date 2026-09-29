// Single source of truth for portfolio content.
// Mirrors src/assets/resume/md-samiul-islam-resume.pdf, so update both together.

// Images are bundled locally rather than hot linked: a third party image host
// is one more thing that can rate limit, rot, or get blocked by an ad blocker
// (ERR_BLOCKED_BY_CLIENT). Vite hashes and caches these.
import aiAssistant from "../assets/projects/ai-assistant.jpg";
import robertaSan from "../assets/projects/roberta-san.jpg";
import clipImageSearch from "../assets/projects/clip-image-search.jpg";
import nltkSentimentDetector from "../assets/projects/nltk-sentiment-detector.jpg";
import moviexone from "../assets/projects/moviexone.jpg";
import realtimeChatRoom from "../assets/projects/realtime-chat-room.jpg";
import aiImageGenerator from "../assets/projects/ai-image-generator.jpg";
import samBlogApp from "../assets/projects/sam-blog-app.jpg";
import transformerPaper from "../assets/publications/transformer-sentiment-analysis.jpg";
import deepLearningPaper from "../assets/publications/deep-learning-sentiment-analysis.jpg";
import certProgrammingForEverybody from "../assets/certifications/programming-for-everybody.jpg";
import certDataScienceDjango from "../assets/certifications/data-science-python-django.jpg";
import certAiForEveryone from "../assets/certifications/ai-for-everyone.jpg";
import certBusinessAi from "../assets/certifications/business-implications-of-ai.jpg";

export const profile = {
  name: "Md. Samiul Islam",
  shortName: "Samiul",
  initials: "SI",
  role: "Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "mdsamiulislam2172@gmail.com",
  phone: "+8801683754038",
  summary:
    "I build product features end to end, FastAPI on the backend and React on the front. I care about system design that actually moves the numbers for a company and its users, and every project is a chance to learn, ship and generate revenue.",
  roles: [
    "Software Engineer",
    "Full Stack Engineer",
    "AI Application Developer",
    "Backend Engineer",
    "NLP Researcher",
  ],
};

export const socials = {
  github: "https://github.com/MDSAMIULSAMI",
  linkedin: "https://www.linkedin.com/in/samiulislamsamii",
  upwork: "https://www.upwork.com/freelancers/~01a6e46c59cff137a9",
  codeforces: "https://codeforces.com/profile/Md_Samiul_Islam",
  leetcode: "https://leetcode.com/u/mdsamiulislam2172",
  instagram: "https://www.instagram.com/__samiul__sami__/",
  email: "mailto:mdsamiulislam2172@gmail.com",
};

export const stats = [
  { value: "34K+", label: "Users served by shipped products" },
  { value: "3+", label: "Years building for production" },
  { value: "2", label: "Peer reviewed publications" },
  { value: "3", label: "Engineering teams shipped with" },
];

export const experience = [
  {
    company: "Travela",
    legalName: "Expert Travel and Tourism Ltd.",
    role: "Software Engineer",
    period: "July 2026 to Present",
    location: "Dhanmondi, Dhaka",
    current: true,
    highlights: [
      "Design and ship product features end to end, with React on the frontend and FastAPI on the backend.",
      "Lead developer on Social CRM, a shared inbox serving 34,000+ users across Facebook, WhatsApp and Instagram.",
      "Built its agent mode, where an LLM agent answers guest questions, shows listings, generates payment links and confirms bookings straight from chat, while human mode hands the thread to a support agent.",
      "Build and maintain core backend services for the Travela app using FastAPI and MySQL.",
    ],
    stack: ["React", "FastAPI", "MongoDB", "MySQL", "LLM Agents"],
  },
  {
    company: "DataCrata",
    role: "Full Stack Engineer",
    period: "July 2025 to Present",
    location: "Remote",
    current: true,
    highlights: [
      "Build FastAPI backends and React frontends, and integrate LLM providers into existing applications.",
      "Implement retrieval augmented generation (RAG) pipelines and agent based workflows.",
      "Evaluate model output with LangSmith to catch regressions before release.",
    ],
    stack: ["FastAPI", "React", "LangChain", "LangSmith", "RAG"],
  },
  {
    company: "CoderOrbit",
    role: "Junior Software Engineer",
    period: "July 2024 to March 2025",
    location: "Mirpur, Dhaka",
    current: false,
    highlights: [
      "Built front end features for the CoderOrbit API Service using Vue.js, Nuxt.js and Next.js on a Laravel backend.",
      "Tested REST endpoints in Postman and wrote the developer facing API documentation.",
    ],
    stack: ["Vue.js", "Nuxt.js", "Next.js", "Laravel", "Postman"],
  },
];

export const education = {
  school: "Green University of Bangladesh",
  degree: "B.Sc. in Computer Science and Engineering",
  period: "2020 to 2024",
  gradYear: "2024",
  location: "Dhaka, Bangladesh",
  detail: "CGPA 3.30 out of 4.00, Dean's Award, Fall 2020",
};

export const skillGroups = [
  {
    title: "Languages & Databases",
    icon: "database",
    items: ["Python", "JavaScript (ES6)", "SQL", "MySQL", "MongoDB"],
  },
  {
    title: "Backend & Frontend",
    icon: "code",
    items: [
      "FastAPI",
      "REST API design",
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Tailwind CSS",
      "Streamlit",
    ],
  },
  {
    title: "AI & Tooling",
    icon: "sparkles",
    items: [
      "LangChain",
      "LangSmith",
      "RAG pipelines",
      "OpenAI API",
      "Git & GitHub",
      "Postman",
      "DataGrip",
      "Kaggle Notebooks",
    ],
  },
  {
    title: "Spoken Languages",
    icon: "globe",
    items: ["Bangla (native)", "English (full professional)"],
  },
];

export const projects = [
  {
    title: "Pageling",
    year: "2026",
    kind: "Agentic Service",
    featured: true,
    description:
      "Turns a PDF into an embeddable chatbot. Upload a file, get a widget token, drop a script tag on any site, and retrieval over the document powers the answers.",
    stack: ["FastAPI", "React", "RAG", "Vector Search"],
    image: aiAssistant,
    links: { private: true },
  },
  {
    title: "RoBERTa-SAN for Text Classification",
    year: "2024",
    kind: "Deep Learning",
    featured: true,
    description:
      "A hybrid transformer architecture proposed and implemented by our team for Bangla text classification, trained on a manually collected non depressive, depressive and suicidal dataset.",
    stack: ["PyTorch", "Transformers", "Kaggle", "Research"],
    image: robertaSan,
    links: {
      github:
        "https://github.com/MDSAMIULSAMI/RoBERTa-SAN-For-Text-Classification/blob/main/roberta-san-adam.ipynb",
    },
  },
  {
    title: "Image Search by Text Prompt using CLIP",
    year: "2024",
    kind: "Computer Vision",
    featured: true,
    description:
      "Encodes prompts and images with CLIP, ranks images by cosine similarity against the prompt embedding and returns the top k matches.",
    stack: ["Python", "CLIP", "OpenAI", "Computer Vision"],
    image: clipImageSearch,
    links: {
      github:
        "https://github.com/MDSAMIULSAMI/Image-Search-by-Text-Prompt-using-CLIP",
    },
  },
  {
    title: "AI Assistant / Agent",
    year: "2024",
    kind: "PWA, Agents",
    description:
      "A progressive web app that picks the right OpenAI model per prompt and manages Google Calendar events through natural language, with LangChain holding conversation memory.",
    stack: ["OpenAI API", "LangChain", "Google OAuth", "PWA"],
    image: aiAssistant,
    links: { github: "https://github.com/MDSAMIULSAMI" },
  },
  {
    title: "Sentiment Detector with NLTK",
    year: "2023",
    kind: "NLP",
    description:
      "A browser form that scores submitted text as positive, negative or neutral using the NLTK sentiment analyser behind a Django backend.",
    stack: ["Django", "NLTK", "Python"],
    image: nltkSentimentDetector,
    links: { github: "https://github.com/MDSAMIULSAMI/Sentiment_Predictor_NLTK" },
  },
  {
    title: "MovieXone",
    year: "2023",
    kind: "Full Stack",
    description:
      "An online movie streaming site with a React frontend talking to a Django REST API backend.",
    stack: ["React", "Django REST", "MySQL"],
    image: moviexone,
    links: { github: "https://github.com/MDSAMIULSAMI/MovieZone-Project" },
  },
  {
    title: "Real Time Chat Room",
    year: "2022",
    kind: "Realtime",
    description:
      "A group chat interface built on Socket.IO, with rooms, live presence and message broadcast.",
    stack: ["Socket.IO", "JavaScript", "HTML", "CSS"],
    image: realtimeChatRoom,
    links: {
      github: "https://github.com/MDSAMIULSAMI/Simple-Real-Time-Chat-Room",
    },
  },
  {
    title: "AI Image Generator",
    year: "2023",
    kind: "Generative AI",
    description:
      "Generates photo realistic images from any text prompt using a Stable Diffusion latent text to image model.",
    stack: ["Stable Diffusion", "Python", "Diffusers"],
    image: aiImageGenerator,
    links: { github: "https://github.com/MDSAMIULSAMI/AI-Image-Generator.git" },
  },
  {
    title: "Sam Blog App",
    year: "2022",
    kind: "Web Platform",
    description:
      "A feature packed blogging platform built with Django for authoring, managing and engaging with posts through a clean, intuitive interface.",
    stack: ["Django", "Python", "SQLite"],
    image: samBlogApp,
    links: { github: "https://github.com/MDSAMIULSAMI/Posting_App.git" },
  },
];

export const publications = [
  {
    title:
      "Transformer Based Sentiment Analysis for Classification of Non Depressive and Suicidal Thought from Bangla Text",
    venue: "International Journal of Research in Business and Social Science",
    image: transformerPaper,
    link: "https://www.researchgate.net/publication/394588211_Transformer-Based_Sentiment_Analysis_for_classification_of_non-depressive_and_suicidal_thought_from_Bangla_Text",
  },
  {
    title:
      "Depressive and Suicidal Text Based Sentiment Analysis in Bangla Using Deep Learning Models",
    venue: "Journal of Business and IT",
    image: deepLearningPaper,
    link: "https://www.researchgate.net/publication/387043086_Depressive_and_Suicidal_Text-Based_Sentiment_Analysis_in_Bangla_Using_Deep_Learning_Models",
  },
];

export const certifications = [
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera, University of Michigan",
    date: "October 2020, 18 hours",
    image: certProgrammingForEverybody,
    link: "https://coursera.org/share/07f76ab8872b96ecba8ff17cee273ef4",
  },
  {
    title: "Data Science Expert with Python Django",
    issuer: "Simplilearn",
    date: "September 2024, 2 hours",
    image: certDataScienceDjango,
    link: "https://simpli-web.app.link/e/42zpWLxPuNb",
  },
  {
    title: "AI For Everyone",
    issuer: "Coursera, DeepLearning.AI",
    date: "June 2020, 6 hours",
    image: certAiForEveryone,
    link: "https://coursera.org/share/6ecabbbf6c791eac234c47930bf3ed84",
  },
  {
    title: "Business Implications of AI: A Nano course",
    issuer: "Coursera",
    date: "July 2020, 1 hour",
    image: certBusinessAi,
    link: "https://coursera.org/share/a9f5b01fc014113f4ba094aac1c9230a",
  },
];

export const interests = [
  "Backend engineering and system design",
  "Agentic AI and RAG systems",
  "Natural language processing research",
  "Generative AI and diffusion models",
];

export const techStack = [
  "Python",
  "JavaScript",
  "FastAPI",
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Django",
  "Laravel",
  "MySQL",
  "MongoDB",
  "LangChain",
  "LangSmith",
  "OpenAI API",
  "Tailwind CSS",
  "Streamlit",
  "Git",
  "GitHub",
  "Postman",
  "DataGrip",
  "Kaggle",
  "Figma",
  "Linux",
  "macOS",
];
