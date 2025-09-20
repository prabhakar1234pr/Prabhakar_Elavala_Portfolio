import Image from "next/image";
import Link from "next/link";

const skills = [
  "Machine Learning", "Deep Learning", "Python", "SQL", "TypeScript", "JavaScript",
  "React", "Next.js", "FastAPI", "Node.js", "PostgreSQL", "MongoDB",
  "AWS", "Azure", "Docker", "Git", "LangChain", "PyTorch", "TensorFlow",
  "Pandas", "NumPy", "Scikit-learn", "MLOps", "Data Science", "AI/ML"
];

const interests = [
  "🤖 Artificial Intelligence & Machine Learning",
  "📊 Data Science & Analytics", 
  "🌐 Full-Stack Web Development",
  "☁️ Cloud Computing & MLOps",
  "🔍 Computer Vision & NLP",
  "📈 Predictive Analytics",
  "🎵 Music & Technology",
  "📚 Continuous Learning"
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          AI/ML Engineer passionate about building intelligent systems that solve real-world problems
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Profile Section */}
        <div className="space-y-6">
          <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80">
            <Image
              src="/WhatsApp Image 2025-07-12 at 18.14.40_c5d80c46.jpg"
              alt="Prabhakar Elavala"
              fill
              className="rounded-2xl object-cover shadow-xl ring-4 ring-purple-500/20"
              priority
            />
          </div>
          
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              Prabhakar Elavala
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              AI/ML Engineer & MS Informatics Student
            </p>
            <p className="text-sm text-muted-foreground">
              📍 Boston, MA | 📧 prabhakarpr554@gmail.com
            </p>
          </div>
        </div>

        {/* About Content */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">
              🚀 Who I Am
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a passionate AI/ML engineer currently pursuing my Master&apos;s in Informatics (Analytics) 
                at Northeastern University with a 3.8 GPA. My journey began in Electronics and Communication 
                Engineering, but I found my true calling in the intersection of data science, artificial 
                intelligence, and full-stack development.
              </p>
              <p>
                I specialize in building production-grade AI/ML systems with a focus on reliability, 
                scalability, and developer experience. My work spans from data engineering and model 
                development to inference services and product integrations.
              </p>
              <p>
                Currently, I&apos;m working as a Data Science Intern at CommandL, where I analyze learner 
                interactions and improve AI-generated instructional data quality. I&apos;ve also contributed 
                to healthcare AI as a volunteer Chatbot Engineer at CareEscapes AI.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">
              💡 What Drives Me
            </h3>
            <div className="grid gap-2">
              {interests.map((interest) => (
                <div key={interest} className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-lg px-4 py-2">
                  <span className="text-sm text-purple-100">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-center text-purple-300">
          🛠️ Technical Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {skills.map((skill) => (
            <div 
              key={skill} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 transition-all duration-300 rounded-lg px-3 py-2 text-sm text-center"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-3 text-purple-200">
            🤝 Let&apos;s Connect!
          </h3>
          <p className="text-muted-foreground mb-6">
            I&apos;m always excited to discuss AI/ML projects, share insights, or explore collaboration opportunities. 
            Whether you&apos;re looking for a skilled engineer or want to chat about the latest in AI technology, 
            I&apos;d love to hear from you!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              💬 Get In Touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-300/30 text-purple-200 font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              🚀 View Projects
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-300/30 text-purple-200 font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              📝 Read Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


