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
          className="border-white/20 bg-white/8 text-white/84 transition-all duration-200 hover:border-white/35 hover:bg-white/16 hover:text-white"
        >
          Video Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw] sm:w-full p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-white/10">
          <DialogTitle className="text-xl font-bold text-white">
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
