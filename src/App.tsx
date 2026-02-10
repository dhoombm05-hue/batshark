import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ScreenAdvertising from "./pages/ScreenAdvertising";
import PadelCourts from "./pages/PadelCourts";
import Umbrix from "./pages/Umbrix";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminVideos from "./pages/AdminVideos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
