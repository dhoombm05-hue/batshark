import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-card border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right">
            <a href="#" className="text-2xl font-bold">
              <span className="text-gradient">AdScreen</span>
            </a>
            <p className="text-muted-foreground mt-2">
              مستقبل الإعلانات الرقمية
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} AdScreen. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;