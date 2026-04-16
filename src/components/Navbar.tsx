import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Lock, Archive } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import AdminLoginDialog from "./admin/AdminLoginDialog";
import logo from "@/assets/logo.png";

interface NavSection {
  slug: string;
  name_ar: string;
  route: string;
  is_visible: boolean;
}

const staticLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { name: "تواصل معنا", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [sections, setSections] = useState<NavSection[]>([]);
  const { isAdmin } = useAdmin();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("business_sections")
        .select("slug, name_ar, route, is_visible")
        .order("sort_order");
      if (data) setSections(data);
    };
    load();
  }, []);

  // Build nav links: static home + dynamic sections (filtered for non-admin) + static about/contact
  const visibleSections = isAdmin ? sections : sections.filter(s => s.is_visible);
  const navLinks = [
    staticLinks[0],
    ...visibleSections.map(s => ({ name: s.name_ar, href: s.route, archived: !s.is_visible })),
    staticLinks[1],
    staticLinks[2],
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-50"
      >
        <div className={`mx-auto max-w-6xl transition-all duration-300 ${
          isScrolled ? "navbar-pill px-6" : "bg-transparent"
        }`}>
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="BATSHARK" className="h-10 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link: any) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } ${link.archived ? "opacity-50" : ""}`}
                >
                  {link.archived && <Archive className="w-3 h-3" />}
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all hover:scale-105"
              >
                اطلب خدمة
              </Link>
              {!isAdmin && (
                <button
                  onClick={() => setShowLogin(true)}
                  className="p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                  title="تسجيل دخول"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-all"
                >
                  لوحة التحكم
                </Link>
              )}
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-6 border-t border-border bg-background rounded-b-2xl px-4 flex flex-col gap-3">
                  {navLinks.map((link: any) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`py-2 font-medium transition-colors flex items-center gap-1 ${
                        location.pathname === link.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      } ${link.archived ? "opacity-50" : ""}`}
                    >
                      {link.archived && <Archive className="w-3 h-3" />}
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    className="mt-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-center"
                  >
                    اطلب خدمة
                  </Link>
                  {!isAdmin && (
                    <button
                      onClick={() => { setShowLogin(true); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Lock className="w-4 h-4" />
                      تسجيل دخول
                    </button>
                  )}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="mt-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-center"
                    >
                      لوحة التحكم
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <AdminLoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;
