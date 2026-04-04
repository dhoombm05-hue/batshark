import { useState, useEffect } from "react";
import { Upload, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SiteImage {
  id: string;
  page: string;
  section: string;
  image_url: string;
}

const pages = [
  { page: "index", section: "hero", label: "الرئيسية — خلفية الهيرو" },
  { page: "padel", section: "hero", label: "البادل — خلفية الهيرو" },
  { page: "umbrix", section: "hero", label: "Umbrix — خلفية الهيرو" },
  { page: "umbrix", section: "logo", label: "Umbrix — الشعار" },
  { page: "screen-advertising", section: "hero", label: "الشاشات — خلفية الهيرو" },
];

const AdminImages = () => {
  const { adminCall } = useAdmin();
  const { toast } = useToast();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminCall("get_images");
      setImages(res.images || []);
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getImage = (page: string, section: string) => {
    return images.find((i) => i.page === page && i.section === section);
  };

  const handleUpload = async (page: string, section: string, file: File) => {
    const key = `${page}-${section}`;
    setUploading(key);
    try {
      // Get signed upload URL
      const { signedUrl, publicUrl } = await adminCall("get_upload_url", { fileName: file.name });
      
      // Upload file
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadRes.ok) throw new Error("فشل رفع الملف");

      // Save to site_images
      await adminCall("upsert_image", { page, section, image_url: publicUrl });
      toast({ title: "تم رفع الصورة بنجاح" });
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setUploading(null);
  };

  const handleUrlChange = async (page: string, section: string, url: string) => {
    try {
      await adminCall("upsert_image", { page, section, image_url: url });
      toast({ title: "تم تحديث الصورة" });
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminCall("delete_image", { id });
      toast({ title: "تم حذف الصورة" });
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">صور وخلفيات الصفحات</h2>
      
      <div className="space-y-4">
        {pages.map(({ page, section, label }) => {
          const img = getImage(page, section);
          const key = `${page}-${section}`;
          return (
            <div key={key} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold text-sm">{label}</span>
                </div>
                {img && (
                  <Button onClick={() => handleDelete(img.id)} variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {img && (
                <div className="mb-3 rounded-lg overflow-hidden h-32 bg-muted">
                  <img src={img.image_url} alt={label} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex gap-2">
                <label className="flex-1">
                  <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-primary/40 cursor-pointer transition-colors text-sm ${uploading === key ? "opacity-50 pointer-events-none" : ""}`}>
                    {uploading === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>رفع صورة</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(page, section, file);
                    }}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
        <h3 className="font-bold text-sm mb-2">إضافة صورة مخصصة</h3>
        <p className="text-xs text-muted-foreground mb-3">أدخل اسم الصفحة والقسم ورابط الصورة</p>
        <CustomImageForm onSave={handleUrlChange} />
      </div>
    </div>
  );
};

const CustomImageForm = ({ onSave }: { onSave: (page: string, section: string, url: string) => void }) => {
  const [page, setPage] = useState("");
  const [section, setSection] = useState("");
  const [url, setUrl] = useState("");
  
  return (
    <div className="grid grid-cols-3 gap-2">
      <Input placeholder="الصفحة (مثل: index)" value={page} onChange={(e) => setPage(e.target.value)} className="text-sm" />
      <Input placeholder="القسم (مثل: hero)" value={section} onChange={(e) => setSection(e.target.value)} className="text-sm" />
      <Input placeholder="رابط الصورة" value={url} onChange={(e) => setUrl(e.target.value)} className="text-sm" />
      <Button onClick={() => { if (page && section && url) { onSave(page, section, url); setPage(""); setSection(""); setUrl(""); } }} size="sm" className="col-span-3" disabled={!page || !section || !url}>
        حفظ
      </Button>
    </div>
  );
};

export default AdminImages;
