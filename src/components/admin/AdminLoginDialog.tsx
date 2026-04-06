import { useState } from "react";
import { Lock, Loader2, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AdminLoginDialog = ({ open, onClose }: Props) => {
  const { login } = useAdmin();
  const { toast } = useToast();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(pw);
    setLoading(false);
    if (success) {
      toast({ title: "تم تسجيل الدخول بنجاح ✅" });
      setPw("");
      onClose();
    } else {
      toast({ title: "خطأ", description: "الرمز غير صحيح", variant: "destructive" });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-background rounded-2xl p-8 max-w-sm w-full shadow-elevated">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-black text-foreground">تسجيل دخول</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="أدخل الرمز"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            autoFocus
          />
          <button type="submit" disabled={loading || !pw} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-50 hover:opacity-90 transition-all">
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginDialog;
