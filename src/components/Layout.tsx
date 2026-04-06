import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminBar from "./admin/AdminBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Navbar />
      <main className="page-transition">{children}</main>
      <Footer />
      <AdminBar />
    </div>
  );
};

export default Layout;
