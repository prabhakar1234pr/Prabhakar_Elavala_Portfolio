import { experience, education } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">Education & Experience</h1>
      <p className="text-muted-foreground mb-12">My academic background and professional journey in AI/ML engineering</p>
      
      {/* Education Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">🎓 Education</h2>
        <ol className="relative border-s pl-6">
          {education.map((e) => (
            <li key={e.org + e.role} className="mb-8 ms-4">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-2 -start-1.5 border-2 border-background" />
              <time className="text-xs text-muted-foreground font-medium">{e.dates}</time>
              <h3 className="text-lg font-semibold mt-1 text-foreground">
                {e.role}
              </h3>
              <p className="text-muted-foreground font-medium">
                {e.org} {e.location && `• ${e.location}`} {e.gpa && `• GPA: ${e.gpa}`}
              </p>
              <ul className="mt-3 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-green-600 dark:text-green-400">💼 Professional Experience</h2>
        <ol className="relative border-s pl-6">
          {experience.map((e) => (
            <li key={e.org + e.role} className="mb-8 ms-4">
              <div className={`absolute w-3 h-3 rounded-full mt-2 -start-1.5 border-2 border-background ${
                e.type === 'internship' ? 'bg-orange-500' : 
                e.type === 'volunteer' ? 'bg-purple-500' : 
                e.type === 'part-time' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
              <div className="flex items-center gap-2 mb-1">
                <time className="text-xs text-muted-foreground font-medium">{e.dates}</time>
                <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${
                  e.type === 'internship' ? 'bg-orange-500' : 
                  e.type === 'volunteer' ? 'bg-purple-500' : 
                  e.type === 'part-time' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {e.type === 'internship' ? 'Internship' : 
                   e.type === 'volunteer' ? 'Volunteer' : 
                   e.type === 'part-time' ? 'Part-time' : 'Full-time'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {e.role}
              </h3>
              <p className="text-muted-foreground font-medium">
                {e.org} {e.location && `• ${e.location}`}
              </p>
              <ul className="mt-3 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}


