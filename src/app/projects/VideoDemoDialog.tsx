"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VideoDemoDialogProps {
  videoSrc: string;
  title?: string;
}

export function VideoDemoDialog({ videoSrc, title = "Video Demo" }: VideoDemoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border-green-300/30 hover:border-green-300/50 text-green-100 hover:text-white transition-all duration-200"
        >
          🎥 Video Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw] sm:w-full p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-white/10">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-black/50">
            <video
              src={videoSrc}
              controls
              className="w-full h-auto"
              style={{ maxHeight: "70vh" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
