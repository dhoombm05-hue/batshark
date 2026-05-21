import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Layout from "./components/Layout";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import ScreenAdvertising from "./pages/ScreenAdvertising";
import PadelCourts from "./pages/PadelCourts";
import Umbrix from "./pages/Umbrix";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminVideos from "./pages/AdminVideos";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SPLASH_KEY = "batshark_splash_shown";

const App = () => {
  const [splashDone, setSplashDone] = useState(() => {
    try {
      return sessionStorage.getItem(SPLASH_KEY) === "1";
    } catch {
      return false;
    }
  });

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* ignore */
    }
    setSplashDone(true);
  };

  if (!splashDone) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/screen-advertising" element={<ScreenAdvertising />} />
                <Route path="/padel-courts" element={<PadelCourts />} />
                <Route path="/umbrix" element={<Umbrix />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/admin/videos" element={<AdminVideos />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
