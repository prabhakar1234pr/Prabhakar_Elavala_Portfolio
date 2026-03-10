export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
  location?: string;
  type?: 'education' | 'work' | 'internship' | 'volunteer' | 'part-time';
  gpa?: string;
};

// Education
export const education: ExperienceItem[] = [
  {
    role: "M.S - Informatics (Concentration: Analytics)",
    org: "Northeastern University",
    dates: "January 2024 – December 2025",
    location: "Boston, MA",
    type: "education",
    gpa: "3.8",
    bullets: [
      "Analytics Concentration — Python & Analytics Technology, Data Management & Big Data, Probability Theory & Statistics, Intermediate Analytics, and Data Visualization",
      "Systems & Cloud foundations — Database Management Systems, AWS Cloud Architecting, Information Systems Design & Development",
      "Capstone project and IBM co-op applied coursework to real-world AI/ML systems in production",
      "GPA: 3.822 / 4.0"
    ],
  },
  {
    role: "B.Tech - Electronics and Communication Engineering",
    org: "Sree Nidhi Institute of Science and Technology (SNIST)",
    dates: "August 2019 – June 2023",
    location: "Hyderabad, India",
    type: "education",
    bullets: [
      "Bachelor's degree in Electronics and Communication Engineering",
      "Strong foundation in engineering principles and technical problem-solving",
      "Developed analytical and technical skills"
    ],
  },
];

// Professional Experience & Internships
export const experience: ExperienceItem[] = [
  {
    role: "AI and Data Intern",
    org: "IBM X Northeastern University",
    dates: "Sep 2025 - Dec 2025",
    location: "Boston, MA (On-site)",
    type: "internship",
    bullets: [
      "Built and deployed a RAG chatbot now live at Northeastern University — students submit documents for Credit for Prior Learning (CPL) and the bot screens applications: clear rejections are handled automatically with reasoned feedback, while viable candidates are forwarded directly to faculty for review",
      "Architected end-to-end RAG pipeline on IBM watsonx: ingested 15+ institutional policy documents, chunked and embedded into Milvus vector database with 768-dimensional embeddings and IVF_FLAT indexing, achieving sub-3 second query response times",
      "Integrated watsonx Assistant with Milvus via custom REST search extensions, enabling natural language queries grounded in actual CPL guidelines and course syllabi",
      "Automated initial CPL screening — 50% reduction in faculty advising workload while giving students accurate, 24/7 guidance on eligibility, evidence requirements, and portfolio preparation"
    ],
  },
  {
    role: "Data Science Intern",
    org: "CommandL",
    dates: "Apr 2025 - Jul 2025",
    location: "San Francisco, CA (Remote)",
    type: "internship",
    bullets: [
      "Analysed 2,000+ learner session logs to identify drop-off points, unclear prompts, and content gaps across CommandL's AI-generated coding curriculum",
      "Built a Python-based LLM evaluation pipeline using RAGAS-style scoring to measure lesson quality, consistency, and pedagogical effectiveness across 15+ training modules",
      "Used findings to redesign course content and prompt structures — reduced editorial revision cycles by 40% and improved clarity scores across the affected modules",
      "Applied prompt engineering and QLoRA fine-tuning experiments to improve model output quality for instructional content generation"
    ],
  },
  {
    role: "Chatbot Engineer (Volunteer)",
    org: "CareEscapes AI",
    dates: "January 2025 – April 2025",
    location: "Boston, USA",
    type: "volunteer",
    bullets: [
      "Built a medical tourism agent that helps users plan dental trips end-to-end — it searches clinics by specialty and price, finds nearby hotels, checks flight availability, and assembles a full itinerary within the user's budget, all via natural language conversation",
      "Architected multi-tool LangGraph agent with Azure OpenAI: designed tool-calling workflows for clinic lookup, hotel search, flight search, and budget optimisation running as coordinated steps within a single conversation",
      "Built Redis-backed WebSocket infrastructure for real-time streaming responses — achieved ~60% faster response times and a 10× improvement in connection stability via progressive backoff and automatic session cleanup",
      "Reduced connection timeout errors by 90% through 15-second ping/pong health monitoring and resilient reconnection logic; deployed on Azure Container Apps for production-scale availability"
    ],
  },
  {
    role: "Simulation Laboratory Assistant (Part-time)",
    org: "Northeastern University",
    dates: "Nov 2024 - Apr 2025",
    location: "Boston, MA (On-campus)",
    type: "part-time",
    bullets: [
      "On-campus part-time position supporting healthcare education by managing high-fidelity simulators",
      "Ensure optimal equipment performance through maintenance, calibration, and technical support",
      "Collaborate with multidisciplinary teams to design and execute realistic medical scenarios",
      "Collect and analyze simulation data to maintain training integrity and assessment reliability",
      "Comprehensive documentation of activities and outcomes to drive continuous improvement",
      "Enhanced technical expertise and understanding of healthcare practices"
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "Vaishnav Technologies",
    dates: "Sep 2024 - Nov 2024",
    location: "Hyderabad, India (Remote)",
    type: "internship",
    bullets: [
      "Focused on Machine Learning with Python in this cutting-edge field internship",
      "Completed comprehensive 2-month program from October 3 to December 3, 2024",
      "Gained practical knowledge in data preprocessing, model development, and implementation",
      "Developed skills in various aspects of machine learning using Python",
      "Intensive period of skill and knowledge development in ML technologies"
    ],
  },
  {
    role: "Cloud Computing Intern",
    org: "All India Council for Technical Education (AICTE)",
    dates: "Mar 2022 - May 2022",
    location: "Hyderabad, India (Remote)",
    type: "internship",
    bullets: [
      "Successfully completed 10-week AWS Cloud Virtual Internship program",
      "Received hands-on training in cloud computing and AWS technologies",
      "Internship supported by AWS Academy focusing on cloud computing fundamentals",
      "Gained practical experience with AWS services and cloud architecture",
      "Built foundation in cloud technologies and distributed systems"
    ],
  },
];


