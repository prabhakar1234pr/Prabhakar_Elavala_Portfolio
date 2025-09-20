export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
  location?: string;
  type?: 'education' | 'work' | 'internship' | 'volunteer';
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
      "Master's degree in Informatics with specialization in Analytics",
      "Coursework in data science, machine learning, and analytics",
      "Currently maintaining a 3.8 GPA"
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
    role: "Data Science Intern",
    org: "CommandL",
    dates: "Apr 2025 - Jul 2025",
    location: "San Francisco, CA (Remote)",
    type: "internship",
    bullets: [
      "Analyzed learner interactions and improved AI-generated instructional data quality",
      "Contributed to performance monitoring of large language models (LLMs) by auditing outputs",
      "Generated QA reports and collaborated with product team to optimize content clarity and efficiency",
      "Helped reduce revision cycles, increase QA pass rates, and provide data-driven insights to improve UX"
    ],
  },
  {
    role: "Chatbot Engineer (Volunteer)",
    org: "CareEscapes AI",
    dates: "January 2025 – April 2025",
    location: "Boston, USA",
    type: "volunteer",
    bullets: [
      "Led development of AI-powered healthcare chatbot for dental tourism using Azure OpenAI and LangGraph",
      "Designed and deployed scalable infrastructure with WebSockets, Redis, FastAPI, and PostgreSQL",
      "Supported multi-agent systems to reduce latency and improve reliability",
      "Integrated front-end components with React and implemented error-handling strategies",
      "Significantly improved uptime and reduced timeout errors for end users"
    ],
  },
  {
    role: "Simulation Laboratory Assistant",
    org: "Northeastern University",
    dates: "Nov 2024 - Apr 2025",
    location: "Boston, MA (On-site)",
    type: "work",
    bullets: [
      "Support healthcare education by managing high-fidelity simulators and training environments",
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


