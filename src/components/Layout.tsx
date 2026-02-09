import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Navbar />
      <main className="page-transition">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
