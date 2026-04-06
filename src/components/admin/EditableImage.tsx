import { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  page: string;
  section: string;
  currentSrc: string;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  onUpdated?: (newUrl: string) => void;
}

const EditableImage = ({ page, section, currentSrc, alt = "", className = "", overlayClassName = "", onUpdated }: Props) => {
  const { isAdmin, adminCall } = useAdmin();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { signedUrl, publicUrl } = await adminCall("get_upload_url", { fileName: file.name });
      const res = await fetch(signedUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      if (!res.ok) throw new Error("فشل رفع الملف");
      await adminCall("upsert_image", { page, section, image_url: publicUrl });
      toast({ title: "تم تحديث الصورة ✅" });
      onUpdated?.(publicUrl);
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setUploading(false);
  };

  return (
    <div className="relative group">
      <img src={currentSrc} alt={alt} className={className} />
      {isAdmin && (
        <>
          <div className={`absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all flex items-center justify-center ${overlayClassName}`}>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="opacity-0 group-hover:opacity-100 transition-all px-4 py-2 rounded-xl bg-background/90 text-foreground font-bold text-sm flex items-center gap-2 hover:bg-background shadow-lg"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              {uploading ? "جاري الرفع..." : "تغيير الصورة"}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
        </>
      )}
    </div>
  );
};

export default EditableImage;
