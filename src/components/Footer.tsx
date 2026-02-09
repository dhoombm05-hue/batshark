import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <img src={logo} alt="BATSHARK" className="h-12 w-auto mb-4 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              شركة متخصصة في الشاشات الإعلانية الرقمية وإدارة المشاريع التجارية المتعددة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-primary-foreground">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">الرئيسية</Link>
              <Link to="/screen-advertising" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">الشاشات الإعلانية</Link>
              <Link to="/projects" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">المشاريع</Link>
              <Link to="/packages" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">الباقات</Link>
            </div>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-bold mb-4 text-primary-foreground">المزيد</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">من نحن</Link>
              <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">تواصل معنا</Link>
              <Link to="/advertisers" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">المعلنين</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-primary-foreground">تواصل معنا</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:0560340081" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                <Phone className="w-4 h-4" />
                <span dir="ltr">0560340081</span>
              </a>
              <a href="https://wa.me/966560340081" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>واتساب</span>
              </a>
              <a href="mailto:sharkshark1030@gmail.com" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                <Mail className="w-4 h-4" />
                <span>sharkshark1030@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} BATSHARK. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
