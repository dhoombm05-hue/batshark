const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-foreground text-white/80">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-right">
            <a href="#" className="text-2xl font-bold text-white">
              BATSHARK
            </a>
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm">
              © {new Date().getFullYear()} BATSHARK. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
