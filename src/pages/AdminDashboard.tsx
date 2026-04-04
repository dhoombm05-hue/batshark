import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Trophy, Image, Layers, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminCourts from "@/components/admin/AdminCourts";
import AdminSections from "@/components/admin/AdminSections";
import AdminImages from "@/components/admin/AdminImages";

const tabs = [
  { id: "courts", label: "ملاعب البادل", icon: Trophy },
  { id: "sections", label: "أقسام الأعمال", icon: Layers },
  { id: "images", label: "الصور والخلفيات", icon: Image },
];

const AdminDashboard = () => {
  const { isAdmin, login, logout } = useAdmin();
  const { toast } = useToast();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("courts");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(pw);
    setLoading(false);
    if (!success) {
      toast({ title: "خطأ", description: "كلمة المرور غير صحيحة", variant: "destructive" });
    }
  };

  if (!isAdmin) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-foreground">لوحة التحكم</h1>
            <p className="text-muted-foreground text-sm mt-1">أدخل كلمة المرور للدخول</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="كلمة المرور"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="text-center text-lg"
              autoFocus
            />
            <Button type="submit" className="w-full" disabled={loading || !pw}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "دخول"}
            </Button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-foreground">لوحة التحكم</h1>
            <p className="text-muted-foreground text-sm">إدارة المحتوى والإعدادات</p>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 ml-2" />
            خروج
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "courts" && <AdminCourts />}
        {activeTab === "sections" && <AdminSections />}
        {activeTab === "images" && <AdminImages />}
      </div>
    </section>
  );
};

export default AdminDashboard;
