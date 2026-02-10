import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Star, Phone, Mail, ChevronLeft, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MemberInfo {
  name: string;
  title: string;
  bio: string;
  experience: string[];
  strengths: string[];
  phone: string;
  email: string;
}

const members: MemberInfo[] = [
  {
    name: "عبدالرحمن بن محبوب",
    title: "الرئيس التنفيذي",
    bio: "قائد استراتيجي يتمتع بخبرة واسعة في إدارة المشاريع الكبرى وتطوير الأعمال.",
    experience: [
      "إدارة مشاريع متعددة القطاعات",
      "تطوير استراتيجيات النمو المؤسسي",
      "قيادة فرق عمل متعددة التخصصات",
    ],
    strengths: ["القيادة الاستراتيجية", "التخطيط طويل المدى", "بناء الشراكات"],
    phone: "",
    email: "",
  },
  {
    name: "محمد تركي الداود",
    title: "نائب الرئيس التنفيذي",
    bio: "خبير في تطوير الأعمال والعمليات التشغيلية بخبرة متميزة في السوق المحلي.",
    experience: [
      "تطوير العمليات التشغيلية",
      "إدارة سلاسل التوريد",
      "التفاوض وإبرام الصفقات",
    ],
    strengths: ["الإدارة التشغيلية", "التفاوض الاحترافي", "تحليل السوق"],
    phone: "",
    email: "",
  },
  {
    name: "نايف بن محمد المطيري",
    title: "مدير التطوير",
    bio: "متخصص في تطوير المشاريع الرياضية والترفيهية بمعايير عالمية.",
    experience: [
      "تطوير المشاريع الرياضية",
      "إدارة المنشآت الترفيهية",
      "الإشراف على التنفيذ",
    ],
    strengths: ["إدارة المشاريع", "الابتكار", "ضبط الجودة"],
    phone: "",
    email: "",
  },
  {
    name: "فهد بن سلطان المحبوب",
    title: "مدير العمليات",
    bio: "خبير في العمليات اللوجستية وإدارة المشاريع التنفيذية.",
    experience: [
      "إدارة العمليات اللوجستية",
      "تنسيق المشاريع التنفيذية",
      "مراقبة الأداء والجودة",
    ],
    strengths: ["التنظيم والإدارة", "حل المشكلات", "الكفاءة التشغيلية"],
    phone: "",
    email: "",
  },
  {
    name: "سعد بن سلطان المحبوب",
    title: "مدير التسويق والمبيعات",
    bio: "متخصص في التسويق الرقمي واستراتيجيات المبيعات الحديثة.",
    experience: [
      "التسويق الرقمي والإعلاني",
      "إدارة علاقات العملاء",
      "تطوير استراتيجيات البيع",
    ],
    strengths: ["التسويق الاستراتيجي", "بناء العلامة التجارية", "خبرة سوقية واسعة"],
    phone: "",
    email: "",
  },
];

const TeamMembers = () => {
  const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(null);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="heading-lg text-foreground mb-3">أعضاء الشركة</h2>
          <p className="text-muted-foreground text-lg">فريق إداري قوي ومنظّم</p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member, index) => (
            <motion.button
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelectedMember(member)}
              className="group text-right p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.title}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                <span>عرض التفاصيل</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-elevated max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedMember.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedMember.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progressive Disclosure via Accordion */}
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="bio" className="border rounded-xl px-4 border-border">
                  <AccordionTrigger className="hover:no-underline gap-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-bold">نبذة عامة</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="experience" className="border rounded-xl px-4 border-border">
                  <AccordionTrigger className="hover:no-underline gap-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="font-bold">الخبرات</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {selectedMember.experience.map((exp, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="strengths" className="border rounded-xl px-4 border-border">
                  <AccordionTrigger className="hover:no-underline gap-3">
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="font-bold">نقاط القوة</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.strengths.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contact" className="border rounded-xl px-4 border-border">
                  <AccordionTrigger className="hover:no-underline gap-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="font-bold">التواصل</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4" />
                        <span>{selectedMember.phone || "سيتم الإضافة قريبًا"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4" />
                        <span>{selectedMember.email || "سيتم الإضافة قريبًا"}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamMembers;
