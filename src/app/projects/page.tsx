"use client";

import { projects } from "@/data/projects";
import { projectReadmes } from "@/data/project-readmes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { DeepDiveDialog } from "./DeepDiveDialog";
import { useState } from "react";

// Cold Start Warning Component for GitGuide
function ColdStartWarning({ demoUrl }: { demoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 underline transition-colors">
          <span>🚀</span> Live Demo
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>⏰</span> Cold Start Notice
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This demo uses free-tier backend servers, which means there will be a <strong>~2 minute cold start</strong> the first time you visit.
          </p>
          <p className="text-sm text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
            ⚡ <strong>Please be patient</strong> - the app will load normally after the initial startup time.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => {
                window.open(demoUrl, '_blank');
                setIsOpen(false);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Continue to Demo
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Featured Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A collection of AI/ML projects, full-stack applications, and innovative solutions I&apos;ve built. 
          Click &quot;Deep Dive&quot; to explore detailed documentation and technical insights.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => {
          const readmeData = projectReadmes[project.title];
          
          return (
            <Card 
              key={project.title} 
              className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl group-hover:text-purple-300 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Project Summary */}
                <p className="text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>

                {/* Highlight Metrics */}
                {project.highlightMetrics && project.highlightMetrics.length > 0 && (
                  <div className="grid grid-cols-1 gap-2">
                    {project.highlightMetrics.map((metric, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-lg p-3 text-sm font-medium text-purple-200"
                      >
                        🎯 {metric}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-purple-200">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-100 border-purple-300/30 hover:bg-purple-500/30 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  {project.links.github && (
                    <Link 
                      href={project.links.github} 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                      <span>🔗</span> GitHub
                    </Link>
                  )}
                  {project.links.demo && (
                    project.title === "GitGuide" ? (
                      <ColdStartWarning demoUrl={project.links.demo} />
                    ) : (
                      <Link 
                        href={project.links.demo} 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 underline transition-colors"
                      >
                        <span>🚀</span> Live Demo
                      </Link>
                    )
                  )}
                  
                  {/* Deep Dive Button */}
                  {readmeData && (
                    <DeepDiveDialog 
                      title={readmeData.projectTitle}
                      content={readmeData.content}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-3 text-purple-200">
            Want to see more?
          </h3>
          <p className="text-muted-foreground mb-4">
            These are just a few highlights from my portfolio. Check out my GitHub for more projects and contributions.
          </p>
          <Link 
            href="https://github.com/prabhakar1234pr" 
            target="_blank"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
          >
            <span>📂</span> View All Projects on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}


