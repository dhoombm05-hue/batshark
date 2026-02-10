import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Film } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Video {
  id: string;
  title: string;
  video_type: "youtube" | "uploaded";
  youtube_url: string | null;
  storage_path: string | null;
}

interface ProjectVideosProps {
  project: "umbrix" | "padel";
  title: string;
  accentColor: string; // e.g. "umbrix" or "padel"
}

const getYoutubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const ProjectVideos = ({ project, title, accentColor }: ProjectVideosProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from("project_videos")
        .select("*")
        .eq("project", project)
        .order("sort_order", { ascending: true });
      setVideos((data as Video[]) || []);
      setLoading(false);
    };
    fetchVideos();
  }, [project]);

  if (loading || videos.length === 0) return null;

  const colorClasses: Record<string, { iconBg: string; icon: string; border: string }> = {
    umbrix: { iconBg: "bg-umbrix/10", icon: "text-umbrix", border: "border-umbrix/20" },
    padel: { iconBg: "bg-padel/10", icon: "text-padel", border: "border-padel/20" },
  };
  const colors = colorClasses[accentColor] || colorClasses.umbrix;

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.iconBg} ${colors.icon} text-sm font-bold mb-4`}>
            <Film className="w-4 h-4" />
            فيديوهات
          </div>
          <h2 className="heading-md text-foreground">{title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden border ${colors.border} bg-card`}
            >
              <div className="aspect-video">
                {video.video_type === "youtube" && video.youtube_url ? (
                  <iframe
                    src={getYoutubeEmbedUrl(video.youtube_url)}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : video.storage_path ? (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source
                      src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/project-videos/${video.storage_path}`}
                      type="video/mp4"
                    />
                  </video>
                ) : null}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Play className={`w-4 h-4 ${colors.icon}`} />
                  <h3 className="font-bold text-foreground text-sm">{video.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectVideos;
