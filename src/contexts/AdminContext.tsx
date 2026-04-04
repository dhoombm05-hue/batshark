import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  adminCall: (action: string, data?: any) => Promise<any>;
}

const AdminContext = createContext<AdminContextType | null>(null);

const STORAGE_KEY = "batshark_admin";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState<string | null>(() => {
    return sessionStorage.getItem(STORAGE_KEY);
  });

  const isAdmin = !!password;

  const adminCall = useCallback(async (action: string, data?: any) => {
    const pw = password || sessionStorage.getItem(STORAGE_KEY);
    if (!pw) throw new Error("Not authenticated");
    
    const { data: result, error } = await supabase.functions.invoke("admin-api", {
      body: { password: pw, action, data },
    });
    
    if (error) throw error;
    if (result?.error) throw new Error(result.error);
    return result;
  }, [password]);

  const login = useCallback(async (pw: string) => {
    try {
      const { data: result, error } = await supabase.functions.invoke("admin-api", {
        body: { password: pw, action: "login" },
      });
      if (error || result?.error) return false;
      setPassword(pw);
      sessionStorage.setItem(STORAGE_KEY, pw);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setPassword(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, adminCall }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
