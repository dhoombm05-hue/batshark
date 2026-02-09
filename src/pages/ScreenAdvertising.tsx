import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Monitor, MapPin, Zap, Shield, BarChart3, Users, Play, Clock, Tv,
  Building2, ShoppingBag, Landmark, Send, ExternalLink, ChevronLeft
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import screenCorporate from "@/assets/screen-corporate.jpg";
import screenMall from "@/assets/screen-mall.jpg";
import screenOutdoor from "@/assets/screen-outdoor.jpg";

const screenLocations = [
  { icon: ShoppingBag, title: "المولات التجارية", description: "شاشات في أبرز المولات ومراكز التسوق ذات الحركة العالية", count: "120+" },
  { icon: Building2, title: "المباني التجارية", description: "شاشات في اللوبيات والمداخل الرئيسية للأبراج والشركات", count: "80+" },
  { icon: Landmark, title: "الشوارع الرئيسية", description: "شاشات LED عملاقة على الطرق والتقاطعات الحيوية", count: "50+" },
  { icon: MapPin, title: "المواقع الاستراتيجية", description: "مواقع مختارة بعناية لضمان أقصى نسبة مشاهدة وتأثير", count: "250+" },
];

const adManagement = [
  { icon: Tv, value: "500+", label: "شاشة إعلانية", desc: "شبكة ضخمة من الشاشات عالية الدقة" },
  { icon: Play, value: "1000+", label: "إعلان نشط", desc: "إعلانات تعمل على مدار الساعة" },
  { icon: Clock, value: "15-60", label: "ثانية لكل إعلان", desc: "مدة عرض مرنة حسب الباقة" },
  { icon: Zap, value: "24/7", label: "تشغيل مستمر", desc: "شاشاتنا تعمل دون توقف" },
];

const advertisers = [
  { name: "معلن 1", adName: "إعلان ترويجي", link: "#" },
  { name: "معلن 2", adName: "حملة موسمية", link: "#" },
  { name: "معلن 3", adName: "إطلاق منتج", link: "#" },
  { name: "معلن 4", adName: "عرض خاص", link: "#" },
  { name: "معلن 5", adName: "حملة توعوية", link: "#" },
  { name: "معلن 6", adName: "إعلان مستمر", link: "#" },
];

const ScreenAdvertising = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    advertiser_name: "",
    ad_name: "",
    store_link: "",
    duration: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.advertiser_name.trim() || !form.ad_name.trim()) {
      toast({ title: "خطأ", description: "يرجى ملء الحقول المطلوبة", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("ad_requests").insert({
        advertiser_name: form.advertiser_name.trim(),
        ad_name: form.ad_name.trim(),
        store_link: form.store_link.trim() || null,
        duration: form.duration.trim() || null,
        notes: form.notes.trim() || null,
      });
      if (error) throw error;
      toast({ title: "تم الإرسال بنجاح", description: "سنتواصل معك في أقرب وقت لتفعيل إعلانك" });
      setForm({ advertiser_name: "", ad_name: "", store_link: "", duration: "", notes: "" });
      setShowForm(false);
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ، يرجى المحاولة مرة أخرى", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero - Digital LED Style */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden bg-foreground text-primary-foreground">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] opacity-10"
          style={{ background: "hsl(var(--primary-foreground))" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ background: "hsl(var(--primary-foreground))" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.05, 0.1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-foreground/20 text-sm font-medium mb-8"
              >
                <Monitor className="w-4 h-4" />
                <span>Screen Advertising</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
                أعلن على
                <span className="block bg-gradient-to-l from-primary-foreground/60 to-primary-foreground bg-clip-text">
                  أكبر شبكة شاشات
                </span>
              </h1>

              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-lg">
                نوفر لك شبكة متكاملة من الشاشات الإعلانية الرقمية عالية الدقة في أبرز المواقع
                الاستراتيجية. اجعل إعلانك يصل لملايين المشاهدين يومياً.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-foreground font-bold text-lg hover:scale-105 transition-all"
                >
                  اطلب إعلانك الآن
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <a
                  href="#locations"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/30 font-medium hover:bg-primary-foreground/10 transition-all"
                >
                  اكتشف المواقع
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-2xl"
                  >
                    <img src={screenMall} alt="شاشات المولات" className="w-full h-52 object-cover" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden border border-primary-foreground/10"
                  >
                    <img src={screenCorporate} alt="شاشات الشركات" className="w-full h-36 object-cover" />
                  </motion.div>
                </div>
                <div className="space-y-3 pt-10">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden border border-primary-foreground/10"
                  >
                    <img src={screenOutdoor} alt="شاشات خارجية" className="w-full h-36 object-cover" />
                  </motion.div>
                  <motion.div
                    className="rounded-2xl border border-primary-foreground/10 p-6 flex flex-col items-center justify-center h-52 bg-primary-foreground/5 backdrop-blur-sm"
                  >
                    <motion.span
                      className="text-5xl font-black"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                    >
                      500+
                    </motion.span>
                    <span className="text-primary-foreground/60 text-sm mt-2">شاشة إعلانية نشطة</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Screen Advertising */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">ما هي الشاشات الإعلانية الرقمية؟</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              الشاشات الإعلانية الرقمية هي الوسيلة الأقوى والأكثر تأثيراً في عالم الإعلان الحديث.
              تعرض محتواك بجودة فائقة في مواقع استراتيجية تضمن وصوله لملايين المشاهدين يومياً.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Monitor, title: "شاشات LED عالية الدقة", description: "أحدث تقنيات العرض الرقمي بدقة 4K تضمن وضوح إعلانك في جميع الظروف" },
              { icon: Zap, title: "تحديث فوري عن بُعد", description: "تحكّم بمحتوى إعلانك في الوقت الفعلي من أي مكان عبر نظام إدارة ذكي" },
              { icon: Shield, title: "تشغيل مستمر 24/7", description: "شاشاتنا تعمل دون توقف لضمان أقصى تعرّض لإعلانك طوال اليوم" },
              { icon: BarChart3, title: "تقارير أداء مفصّلة", description: "إحصائيات دقيقة عن عدد المشاهدات وأداء حملتك الإعلانية" },
              { icon: Users, title: "وصول لملايين المشاهدين", description: "شبكة شاشات في أكثر المواقع ازدحاماً تضمن أوسع انتشار ممكن" },
              { icon: Play, title: "محتوى ديناميكي", description: "إمكانية عرض فيديو، صور، وتصاميم متحركة بجودة سينمائية" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group p-7 rounded-2xl bg-card border border-border hover:border-foreground/20 hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen Locations */}
      <section id="locations" className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">أماكن تواجد الشاشات</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              شاشاتنا موزّعة في أكثر المواقع حيوية وازدحاماً لضمان أقصى تأثير
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {screenLocations.map((loc, index) => (
              <motion.div
                key={loc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 p-7 rounded-2xl bg-background border border-border hover:shadow-card transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-foreground text-primary-foreground flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <loc.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{loc.title}</h3>
                    <span className="text-sm font-bold bg-muted px-3 py-1 rounded-full">{loc.count}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{loc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Management / Infographics */}
      <section className="section-padding bg-foreground text-primary-foreground">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">إدارة الإعلانات</h2>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
              نظام متكامل لإدارة وعرض إعلاناتك بأعلى كفاءة
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {adManagement.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-primary-foreground/70" />
                <motion.div
                  className="text-4xl md:text-5xl font-black mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                >
                  {item.value}
                </motion.div>
                <div className="text-sm font-bold mb-1">{item.label}</div>
                <div className="text-xs text-primary-foreground/50">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* How it works */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-10">آلية تشغيل الإعلان</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "اختر موقعك", desc: "حدد الشاشات والمواقع التي تريد الإعلان فيها" },
                { step: "02", title: "أرسل المحتوى", desc: "أرسل تصميمك أو نصممه لك باحترافية" },
                { step: "03", title: "نعرض إعلانك", desc: "يتم بث إعلانك على الشاشات المختارة فوراً" },
                { step: "04", title: "تابع الأداء", desc: "احصل على تقارير مفصلة عن أداء حملتك" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="text-center p-5 rounded-2xl border border-primary-foreground/10"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center text-xl font-black mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-primary-foreground/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advertisers */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">المعلنين الحاليين</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              الإعلانات المعروضة حالياً على شبكة شاشاتنا
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advertisers.map((ad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all group"
              >
                <div className="w-full h-36 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Monitor className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h3 className="font-bold text-lg mb-1">{ad.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{ad.adName}</p>
                {ad.link !== "#" && (
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:gap-2 transition-all"
                  >
                    زيارة الموقع <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-foreground mb-6">جاهز لإطلاق إعلانك؟</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              انضم لأكثر من 1000 علامة تجارية تثق في شبكة شاشاتنا الإعلانية
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              اطلب إعلانك الآن
              <ChevronLeft className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ad Request Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-background rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-elevated"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-md text-foreground">اطلب إعلانك</h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم المعلن *</label>
                <input
                  type="text"
                  value={form.advertiser_name}
                  onChange={(e) => setForm({ ...form, advertiser_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-foreground focus:outline-none transition-colors"
                  placeholder="اسم الشركة أو المعلن"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">اسم الإعلان *</label>
                <input
                  type="text"
                  value={form.ad_name}
                  onChange={(e) => setForm({ ...form, ad_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-foreground focus:outline-none transition-colors"
                  placeholder="عنوان أو اسم الإعلان"
                  maxLength={200}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رابط المتجر / الموقع</label>
                <input
                  type="url"
                  value={form.store_link}
                  onChange={(e) => setForm({ ...form, store_link: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-foreground focus:outline-none transition-colors"
                  placeholder="https://example.com"
                  maxLength={500}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">مدة الإعلان المطلوبة</label>
                <select
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-foreground focus:outline-none transition-colors"
                >
                  <option value="">اختر المدة</option>
                  <option value="أسبوع">أسبوع</option>
                  <option value="شهر">شهر</option>
                  <option value="3 أشهر">3 أشهر</option>
                  <option value="6 أشهر">6 أشهر</option>
                  <option value="سنة">سنة</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ملاحظات إضافية</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-foreground focus:outline-none transition-colors min-h-[100px] resize-none"
                  placeholder="أي ملاحظات أو متطلبات خاصة..."
                  maxLength={1000}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "جاري الإرسال..." : (
                  <>
                    إرسال الطلب
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ScreenAdvertising;
