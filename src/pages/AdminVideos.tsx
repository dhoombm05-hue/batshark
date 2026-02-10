import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Film, Lock, Upload, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Video {
  id: string;
  project: string;
  title: string;
  video_type: string;
  youtube_url: string | null;
  storage_path: string | null;
  sort_order: number;
  created_at: string;
}

const AdminVideos = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [project, setProject] = useState<"umbrix" | "padel">("umbrix");
  const [title, setTitle] = useState("");
  const [videoType, setVideoType] = useState<"youtube" | "uploaded">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("project_videos")
      .select("*")
      .order("project")
      .order("sort_order", { ascending: true });
    setVideos((data as Video[]) || []);
  };

  useEffect(() => {
    if (authenticated) fetchVideos();
  }, [authenticated]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await supabase.functions.invoke("manage-videos", {
        body: { password, action: "add", project: "umbrix", title: "__test__", video_type: "youtube", youtube_url: "test" },
      });
      if (res.error || res.data?.error) {
        toast({ title: "خطأ", description: "كلمة المرور غير صحيحة", variant: "destructive" });
      } else {
        // Delete the test entry
        await supabase.functions.invoke("manage-videos", {
          body: { password, action: "delete", id: res.data.id },
        });
        setAuthenticated(true);
        toast({ title: "تم الدخول بنجاح" });
      }
    } catch {
      toast({ title: "خطأ في الاتصال", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      toast({ title: "أدخل عنوان الفيديو", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      let storagePath = null;

      if (videoType === "uploaded" && videoFile) {
        // Get signed upload URL
        const urlRes = await supabase.functions.invoke("manage-videos", {
          body: { password, action: "upload-url", project, fileName: videoFile.name },
        });
        if (urlRes.data?.error) throw new Error(urlRes.data.error);

        // Upload file
        const { error: uploadError } = await supabase.storage
          .from("project-videos")
          .uploadToSignedUrl(urlRes.data.path, urlRes.data.token, videoFile);
        if (uploadError) throw uploadError;
        storagePath = urlRes.data.path;
      }

      const res = await supabase.functions.invoke("manage-videos", {
        body: {
          password,
          action: "add",
          project,
          title,
          video_type: videoType,
          youtube_url: videoType === "youtube" ? youtubeUrl : null,
          storage_path: storagePath,
          sort_order: videos.length,
        },
      });

      if (res.data?.error) throw new Error(res.data.error);

      toast({ title: "تم إضافة الفيديو بنجاح ✅" });
      setTitle("");
      setYoutubeUrl("");
      setVideoFile(null);
      fetchVideos();
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    }
    setUploading(false);
  };

  const handleDelete = async (video: Video) => {
    try {
      await supabase.functions.invoke("manage-videos", {
        body: { password, action: "delete", id: video.id, storage_path: video.storage_path },
      });
      toast({ title: "تم حذف الفيديو" });
      fetchVideos();
    } catch {
      toast({ title: "خطأ في الحذف", variant: "destructive" });
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm p-8 rounded-2xl bg-card border border-border text-center"
        >
          <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-6">لوحة إدارة الفيديوهات</h1>
          <Input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4 text-center"
          />
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "جاري التحقق..." : "دخول"}
          </Button>
        </motion.div>
      </div>
    );
  }

  const umbrixVideos = videos.filter((v) => v.project === "umbrix");
  const padelVideos = videos.filter((v) => v.project === "padel");

  return (
    <div className="min-h-screen bg-background py-28 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Film className="w-6 h-6 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">إدارة الفيديوهات</h1>
        </div>

        {/* Add form */}
        <div className="p-6 rounded-2xl bg-card border border-border mb-10">
          <h2 className="font-bold text-foreground mb-4">إضافة فيديو جديد</h2>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>المشروع</Label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value as "umbrix" | "padel")}
                  className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="umbrix">Umbrix</option>
                  <option value="padel">ملاعب البادل</option>
                </select>
              </div>
              <div>
                <Label>نوع الفيديو</Label>
                <select
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value as "youtube" | "uploaded")}
                  className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="youtube">رابط يوتيوب</option>
                  <option value="uploaded">رفع ملف فيديو</option>
                </select>
              </div>
            </div>

            <div>
              <Label>عنوان الفيديو</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: فيديو توضيحي" className="mt-1" />
            </div>

            {videoType === "youtube" ? (
              <div>
                <Label>رابط اليوتيوب</Label>
                <Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="mt-1" dir="ltr" />
              </div>
            ) : (
              <div>
                <Label>ملف الفيديو</Label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                />
              </div>
            )}

            <Button onClick={handleAdd} disabled={uploading} className="w-full">
              {uploading ? (
                "جاري الرفع..."
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" /> إضافة الفيديو
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Video lists */}
        {[
          { label: "Umbrix", data: umbrixVideos, color: "text-umbrix" },
          { label: "ملاعب البادل", data: padelVideos, color: "text-padel" },
        ].map((section) => (
          <div key={section.label} className="mb-8">
            <h3 className={`font-bold ${section.color} mb-3`}>{section.label}</h3>
            {section.data.length === 0 ? (
              <p className="text-muted-foreground text-sm">لا توجد فيديوهات</p>
            ) : (
              <div className="space-y-2">
                {section.data.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                      {video.video_type === "youtube" ? (
                        <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Upload className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium text-foreground">{video.title}</span>
                      <span className="text-xs text-muted-foreground">({video.video_type})</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(video)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVideos;
