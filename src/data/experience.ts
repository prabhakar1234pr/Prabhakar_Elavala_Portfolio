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
    role: "AI Engineer",
    org: "NXT Financial Group",
    dates: "Jan 2026 - Present",
    location: "San Francisco",
    type: "work",
    bullets: [
      "Engineered a custom subscription detection algorithm that groups transactions by merchant, validates recurring billing patterns (weekly/biweekly/monthly/yearly) using gap analysis, and filters by a ≤5% amount variance threshold — auto-detecting subscriptions with zero manual input",
      "Developed a multi-component Financial Health Score (0–100) across four weighted dimensions: budget adherence, savings goal progress, subscription load ratio, and month-over-month spending trend, with Groq LLM-generated personalized improvement tips",
      "Built a Subscription Negotiation Engine that identifies high-cost subscriptions (>$20/mo), serves category-aware negotiation tips, and generates AI-powered call scripts via Groq to help users reduce recurring bills — estimating ~20% potential savings per candidate",
      "Implemented a Spending Anomaly Detector that compares current-month category spend against a 3-month rolling average and flags categories with 30%+ spikes for proactive alerts"
    ],
  },
  {
    role: "AI Engineer",
    org: "IBM X Northeastern University",
    dates: "Sep 2025 - Dec 2025",
    location: "Boston, MA (On-site)",
    type: "internship",
    bullets: [
      "Owned end-to-end development of an autonomous question-answering service for student policy guidance — translated ambiguous stakeholder requirements into a testable system design and delivered a production-ready REST interface with clear versioning, logging, and rollback procedures within a 3-month window",
      "Built a simulation-driven validation harness with deterministic replay of recorded queries, synthetic edge-case generation, and automated regression suites — improved pre-release defect discovery rate by 2.1× and reduced production hotfixes during the pilot period",
      "Implemented a distributed retrieval pipeline (vector DB + document ingestion service) with tuned chunking, indexing, and caching strategies — reduced hallucinated or unsupported responses by 35% while keeping p95 end-to-end latency under 900 ms",
      "Hardened the system with structured telemetry, health checks, and alertable SLOs; performed fault injection tests (dependency timeouts, partial data corruption, empty index) — achieved 99.5% successful request completion during staged rollout",
      "Integrated assistant front-end, retrieval service, and policy content store through well-defined APIs using contract tests and schema validation, coordinating interface definitions and deployment sequencing across counterpart teams"
    ],
  },
  {
    role: "Data Scientist",
    org: "CommandL",
    dates: "Jan 2025 - Aug 2025",
    location: "San Francisco, CA (Remote)",
    type: "internship",
    bullets: [
      "Owned end-to-end development of a reliability-focused evaluation harness for autonomous-style decision outputs — designed the scoring rubric, implemented deterministic test cases in Python, and wired results into a repeatable CI-style workflow, reducing manual review time by 35% across 15+ training modules",
      "Built simulation-like offline validation by generating scenario suites from 2,000+ real user interaction logs and replaying them through candidate builds — increased detected failure modes per evaluation run by 2.3× and enabled faster root-cause isolation",
      "Implemented a distributed evaluation pipeline that parallelized batch scoring across multiple workers with structured logging, metrics, and traceable run artifacts — cut average evaluation turnaround from hours to under 25 minutes while improving reproducibility across environments",
      "Applied first-principles debugging to reduce non-determinism in evaluation results by enforcing fixed seeds, version-pinned dependencies, and snapshot-based datasets — improved run-to-run score variance by 60% and made failures actionable for integration teams",
      "Optimized model adaptation workflows using parameter-efficient fine-tuning with QLoRA, tuning hyperparameters for stability and validating changes against a gated test suite — reduced revision cycles by 40% and delivered more consistent outputs aligned to quality standards"
    ],
  },
  {
    role: "AI Engineer",
    org: "CareEscapes AI",
    dates: "Feb 2024 - Dec 2024",
    location: "Boston, MA (Remote)",
    type: "work",
    bullets: [
      "Owned end-to-end development of a highly reliable real-time autonomous triage and routing service for a healthcare chatbot — translated operational requirements into a testable system design with strict Pydantic contracts, achieving a 30% reduction in initial triage response time while maintaining consistent behavior under burst traffic",
      "Engineered a low-latency, high-concurrency messaging and state layer using WebSocket sessions, Redis pub/sub, and idempotent message handling — supported a 50% increase in active users while sustaining sub-second message delivery and zero dropped connections during load tests and production peak periods",
      "Built simulation and validation tooling including deterministic replay of conversation events, fault injection for network partitions and Redis failover, and automated regression suites — improved release confidence and reduced production incident recurrence through systematic pre-deployment verification",
      "Implemented mission-critical reliability features: structured health checks, watchdog-style monitoring, bounded retries with exponential backoff, circuit breaker behavior, and TTL-based state expiration — improved service availability and reduced stale session accumulation by 90% within defined SLOs",
      "Profiled hot paths, reduced serialization overhead, and tightened API invariants with explicit schemas — produced design notes and runbooks that enabled on-call ownership and accelerated onboarding for new engineers by 30%"
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
