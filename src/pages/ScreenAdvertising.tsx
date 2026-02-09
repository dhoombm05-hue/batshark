import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Monitor, MapPin, Zap, Shield, Play, Clock, ChevronLeft, Send, Lock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import screenMall from "@/assets/screen-mall.jpg";

interface Location {
  id: string;
  name: string;
  available: boolean;
  screens?: string;
  adSlots?: string;
  adDuration?: string;
  adDays?: string;
  adTypes?: string[];
}

const locations: Location[] = [
  {
    id: "kahf-alnahla",
    name: "مركز كهف النحلة",
    available: true,
    screens: "يتم التحديث",
    adSlots: "يتم التحديث",
    adDuration: "15 - 60 ثانية",
    adDays: "يتم التحديث",
    adTypes: ["إعلان صوري", "إعلان فيديو", "إعلان تفاعلي"],
  },
  { id: "loc-2", name: "موقع جديد — قريبًا", available: false },
  { id: "loc-3", name: "موقع جديد — قريبًا", available: false },
];

const ScreenAdvertising = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
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
      toast({ title: "تم الإرسال بنجاح", description: "سنتواصل معك في أقرب وقت" });
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
      {/* Hero — Clean & Minimal */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden bg-foreground text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-digital/40 text-digital text-sm font-bold mb-8">
                <Monitor className="w-4 h-4" />
                Screen Advertising
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                الشاشات الإعلانية
                <span className="block text-digital/80 mt-2">الرقمية</span>
              </h1>

              <p className="text-primary-foreground/60 text-lg leading-relaxed mb-10 max-w-lg">
                شاشات إعلانية رقمية عالية الدقة في مواقع استراتيجية.
                اعرض إعلانك أمام آلاف المشاهدين يوميًا.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-digital text-digital-foreground font-bold text-lg hover:scale-105 transition-all"
                >
                  اطلب إعلانك الآن
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <a
                  href="#locations"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/30 font-medium hover:bg-primary-foreground/10 transition-all"
                >
                  مواقع الشاشات
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-2xl">
                <img src={screenMall} alt="شاشات إعلانية" className="w-full h-80 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer — Simplified */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-foreground mb-4">خدماتنا</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              حلول إعلانية رقمية متكاملة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Monitor, title: "شاشات LED", desc: "عرض بدقة عالية في جميع الظروف" },
              { icon: Zap, title: "تحديث فوري", desc: "تحكّم بمحتوى إعلانك عن بُعد" },
              { icon: Shield, title: "تشغيل مستمر", desc: "شاشاتنا تعمل على مدار الساعة" },
              { icon: Play, title: "محتوى متنوع", desc: "فيديو، صور، وتصاميم متحركة" },
              { icon: Clock, title: "مدة مرنة", desc: "حدد مدة عرض إعلانك حسب حاجتك" },
              { icon: MapPin, title: "مواقع مختارة", desc: "أماكن استراتيجية ذات حركة عالية" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-digital/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-digital/10 text-digital flex items-center justify-center mb-4 group-hover:bg-digital group-hover:text-digital-foreground transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations — Progressive */}
      <section id="locations" className="section-padding bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-foreground mb-4">مواقع الشاشات</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              اختر الموقع لعرض خيارات الإعلان المتاحة
            </p>
          </motion.div>

          <div className="space-y-4">
            {locations.map((loc, index) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {loc.available ? (
                  <button
                    onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                    className={`w-full text-right p-6 rounded-2xl border-2 transition-all ${
                      selectedLocation?.id === loc.id
                        ? "bg-digital/5 border-digital/40"
                        : "bg-background border-border hover:border-digital/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-digital/10 text-digital flex items-center justify-center">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{loc.name}</h3>
                          <span className="text-xs text-digital font-medium">متاح — اضغط لعرض التفاصيل</span>
                        </div>
                      </div>
                      <ChevronLeft className={`w-5 h-5 text-muted-foreground transition-transform ${
                        selectedLocation?.id === loc.id ? "rotate-90" : ""
                      }`} />
                    </div>

                    <AnimatePresence>
                      {selectedLocation?.id === loc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border">
                            {[
                              { label: "عدد الشاشات", value: loc.screens },
                              { label: "عدد الإعلانات", value: loc.adSlots },
                              { label: "مدة الإعلان", value: loc.adDuration },
                              { label: "عدد الأيام", value: loc.adDays },
                            ].map((item) => (
                              <div key={item.label} className="p-3 rounded-xl bg-card border border-border">
                                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                                <p className="text-sm font-bold text-foreground">{item.value}</p>
                              </div>
                            ))}
                          </div>
                          {loc.adTypes && (
                            <div className="mt-4">
                              <p className="text-xs text-muted-foreground mb-2">أنواع الإعلان المتاحة</p>
                              <div className="flex flex-wrap gap-2">
                                {loc.adTypes.map((type) => (
                                  <span key={type} className="px-3 py-1 rounded-full bg-digital/10 text-digital text-xs font-medium">
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ) : (
                  <div className="w-full p-6 rounded-2xl border-2 border-border bg-background/50 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-muted-foreground">{loc.name}</h3>
                        <span className="text-xs text-muted-foreground">قريبًا</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-foreground mb-4">جاهز لإطلاق إعلانك؟</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
              تواصل معنا وسنساعدك في اختيار أفضل خيار إعلاني
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-digital text-digital-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              اطلب إعلانك الآن
              <ChevronLeft className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
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
                  <input type="text" value={form.advertiser_name}
                    onChange={(e) => setForm({ ...form, advertiser_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="اسم الشركة أو المعلن" maxLength={100} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اسم الإعلان *</label>
                  <input type="text" value={form.ad_name}
                    onChange={(e) => setForm({ ...form, ad_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="عنوان أو اسم الإعلان" maxLength={200} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رابط المتجر / الموقع</label>
                  <input type="url" value={form.store_link}
                    onChange={(e) => setForm({ ...form, store_link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="https://example.com" maxLength={500} dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">مدة الإعلان المطلوبة</label>
                  <select value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors">
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
                  <textarea value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors min-h-[100px] resize-none"
                    placeholder="أي ملاحظات أو متطلبات خاصة..." maxLength={1000} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-full bg-digital text-digital-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? "جاري الإرسال..." : (<>إرسال الطلب <Send className="w-5 h-5" /></>)}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenAdvertising;
