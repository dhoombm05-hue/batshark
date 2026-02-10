import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Monitor, MapPin, ChevronLeft, Send, Lock, Upload
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import screenMall from "@/assets/screen-mall.jpg";

interface Location {
  id: string;
  name: string;
  available: boolean;
  screens: number;
}

const locations: Location[] = [
  { id: "kahf-alnahla", name: "مركز كهف النحلة", available: true, screens: 3 },
  { id: "loc-2", name: "موقع جديد — قريبًا", available: false, screens: 0 },
  { id: "loc-3", name: "موقع جديد — قريبًا", available: false, screens: 0 },
];

const ScreenAdvertising = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedScreens, setSelectedScreens] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    advertiser_name: "",
    ad_name: "",
    store_link: "",
    ad_link: "",
    barcode: "",
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
        notes: [
          form.ad_link ? `رابط الإعلان: ${form.ad_link}` : "",
          form.barcode ? `باركود: ${form.barcode}` : "",
          form.notes || "",
        ].filter(Boolean).join("\n") || null,
      });
      if (error) throw error;
      toast({ title: "تم الإرسال بنجاح", description: "سنتواصل معك في أقرب وقت لإرسال السعر" });
      setForm({ advertiser_name: "", ad_name: "", store_link: "", ad_link: "", barcode: "", duration: "", notes: "" });
      setShowForm(false);
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ، يرجى المحاولة مرة أخرى", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden bg-foreground text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-digital/40 text-digital text-sm font-bold mb-6">
                <Monitor className="w-4 h-4" />
                Screen Advertising
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
                الشاشات الإعلانية
                <span className="block text-digital/80 mt-1">الرقمية</span>
              </h1>
              <p className="text-primary-foreground/60 text-lg leading-relaxed mb-8 max-w-lg">
                شاشات إعلانية رقمية عالية الدقة في مواقع استراتيجية.
                اعرض إعلانك أمام آلاف المشاهدين يوميًا.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-digital text-digital-foreground font-bold text-lg hover:scale-105 transition-all"
                >
                  أرسل عرضك الإعلاني
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <a href="#locations" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/30 font-medium hover:bg-primary-foreground/10 transition-all">
                  مواقع الشاشات
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
              <div className="rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-2xl">
                <img src={screenMall} alt="شاشات إعلانية" className="w-full h-72 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations — Progressive */}
      <section id="locations" className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-foreground mb-3">مواقع الشاشات</h2>
            <p className="text-muted-foreground text-lg">اختر الموقع لعرض خيارات الإعلان</p>
          </motion.div>

          <div className="space-y-4">
            {locations.map((loc, index) => (
              <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                {loc.available ? (
                  <button
                    onClick={() => {
                      setSelectedLocation(selectedLocation?.id === loc.id ? null : loc);
                      setShowDetails(false);
                      setSelectedScreens(1);
                    }}
                    className={`w-full text-right p-6 rounded-2xl border-2 transition-all ${
                      selectedLocation?.id === loc.id ? "bg-digital/5 border-digital/40" : "bg-card border-border hover:border-digital/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-digital/10 text-digital flex items-center justify-center">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{loc.name}</h3>
                          <span className="text-xs text-digital font-medium">{loc.screens} شاشات — اضغط لعرض التفاصيل</span>
                        </div>
                      </div>
                      <ChevronLeft className={`w-5 h-5 text-muted-foreground transition-transform ${selectedLocation?.id === loc.id ? "rotate-90" : ""}`} />
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
                          <div className="mt-6 pt-6 border-t border-border">
                            {/* Screen count selector */}
                            <p className="text-sm font-bold text-foreground mb-3">اختر عدد الشاشات</p>
                            <div className="flex gap-3 mb-4">
                              {[1, 2, 3].map((n) => (
                                <button
                                  key={n}
                                  onClick={(e) => { e.stopPropagation(); setSelectedScreens(n); }}
                                  className={`flex-1 py-3 rounded-xl text-center font-bold transition-all ${
                                    selectedScreens === n ? "bg-digital text-digital-foreground" : "bg-card border border-border text-foreground hover:border-digital/30"
                                  }`}
                                >
                                  {n} {n === 1 ? "شاشة" : "شاشات"}
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
                              className="w-full py-3 rounded-xl bg-digital/10 text-digital font-bold text-sm hover:bg-digital/20 transition-all"
                            >
                              {showDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                            </button>

                            <AnimatePresence>
                              {showDetails && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="p-3 rounded-xl bg-background border border-border">
                                        <p className="text-xs text-muted-foreground mb-1">عدد الشاشات المختارة</p>
                                        <p className="text-sm font-bold text-foreground">{selectedScreens}</p>
                                      </div>
                                      <div className="p-3 rounded-xl bg-background border border-border">
                                        <p className="text-xs text-muted-foreground mb-1">مدة الإعلان</p>
                                        <p className="text-sm font-bold text-foreground">15 - 60 ثانية</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-2">أنواع الإعلان المتاحة</p>
                                      <div className="flex flex-wrap gap-2">
                                        {["إعلان صوري", "إعلان فيديو", "إعلان تفاعلي"].map((type) => (
                                          <span key={type} className="px-3 py-1 rounded-full bg-digital/10 text-digital text-xs font-medium">{type}</span>
                                        ))}
                                      </div>
                                    </div>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setShowForm(true); }}
                                      className="w-full mt-2 py-3 rounded-xl bg-digital text-digital-foreground font-bold hover:opacity-90 transition-all"
                                    >
                                      أرسل عرضك الإعلاني
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ) : (
                  <div className="w-full p-6 rounded-2xl border-2 border-border bg-card opacity-60">
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
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-lg text-foreground mb-3">جاهز لإطلاق إعلانك؟</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
              أرسل عرضك وسنتواصل معك بالسعر والتفاصيل
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-digital text-digital-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              أرسل عرضك الإعلاني
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
                <h3 className="heading-md text-foreground">أرسل عرضك الإعلاني</h3>
                <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم العميل *</label>
                  <input type="text" value={form.advertiser_name} onChange={(e) => setForm({ ...form, advertiser_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="اسم الشركة أو العميل" maxLength={100} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اسم الإعلان *</label>
                  <input type="text" value={form.ad_name} onChange={(e) => setForm({ ...form, ad_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="عنوان أو اسم الإعلان" maxLength={200} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رابط الموقع / المتجر</label>
                  <input type="url" value={form.store_link} onChange={(e) => setForm({ ...form, store_link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="https://example.com" maxLength={500} dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رابط الإعلان</label>
                  <input type="url" value={form.ad_link} onChange={(e) => setForm({ ...form, ad_link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="رابط فيديو أو صورة الإعلان" maxLength={500} dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">باركود الإعلان (اختياري)</label>
                  <input type="text" value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors"
                    placeholder="باركود أو QR Code" maxLength={200} dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">مدة الإعلان المطلوبة</label>
                  <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
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
                  <label className="block text-sm font-medium mb-2">رفع ملف الإعلان</label>
                  <label className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-border hover:border-digital/40 cursor-pointer transition-colors text-muted-foreground hover:text-digital">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm font-medium">اختر ملف</span>
                    <input type="file" className="hidden" accept="image/*,video/*,.pdf" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ملاحظات إضافية</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-digital focus:outline-none transition-colors min-h-[80px] resize-none"
                    placeholder="أي ملاحظات أو متطلبات خاصة..." maxLength={1000} />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  بعد الإرسال، سيتم مراجعة طلبك وإرسال السعر لك
                </p>
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
