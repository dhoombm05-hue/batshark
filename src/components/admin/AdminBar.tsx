import { LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

const AdminBar = () => {
  const { isAdmin, logout } = useAdmin();
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/95 text-primary-foreground shadow-elevated backdrop-blur-sm border border-primary-foreground/10">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-xs font-bold">وضع التحرير</span>
      <div className="w-px h-4 bg-primary-foreground/20 mx-1" />
      <Link to="/admin" className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="لوحة التحكم">
        <Settings className="w-4 h-4" />
      </Link>
      <button onClick={logout} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="تسجيل خروج">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AdminBar;
