import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Star, Phone, Mail, ChevronLeft, X, Wrench } from "lucide-react";
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
  skills: string[];
  phone: string;
  email: string;
}

const members: MemberInfo[] = [
  {
    name: "عبدالرحمن بن بندر محبوب",
    title: "الرئيس التنفيذي / مدير العمليات",
    bio: "",
    experience: [
      "إدارة المشاريع الكبيرة والصغيرة بكفاءة عالية",
      "خبرة في العمل الحر وتنفيذ المشاريع المستقلة",
      "الإبداع وحل المشكلات",
      "تحليل البيانات المعقدة",
      "إدارة العلاقات مع العملاء والتواصل الفعّال",
    ],
    skills: [
      "الإنجليزية: متقدم",
      "الفرنسية: مبتدئ",
      "الإسبانية: مبتدئ",
    ],
    phone: "0560340081",
    email: "dhoombm05@gmail.com",
  },
  {
    name: "فهد بن سلطان المحبوب",
    title: "نائب الرئيس التنفيذي – استراتيجي",
    bio: "حاصل على ASA (زميل مشارك – جمعية الاكتواريين SOA)، ورائد أعمال أركز على بناء منتجات ومشاريع قابلة للنمو والتوسع بجودة عالية.",
    experience: [
      "قيادة الاستراتيجية والتنفيذ في الشركات الناشئة",
      "صياغة نماذج الأعمال وخارطة الطريق",
      "توحيد الفرق والشركاء",
      "اتخاذ القرارات المبنية على البيانات",
      "بناء نماذج مالية قوية ودراسة المخاطر",
      "العمل في شركة استشارية في دبي",
      "إدارة أصحاب المصلحة ومنهجية عمل منظمة",
    ],
    skills: [],
    phone: "0506191078",
    email: "f.binsultan0@gmail.com",
  },
  {
    name: "محمد تركي الداود",
    title: "مدير عمليات / تصميم وتقنية",
    bio: "طالب في تخصص علوم البناء والعمارة في جامعة الملك سعود، مهتم بتصميم المواقع واستخدام البرامج الحاسوبية في المشاريع العملية.",
    experience: [
      "إنشاء مواقع إلكترونية",
      "التصميم باستخدام البرامج الحاسوبية",
    ],
    skills: [
      "التحدث باللغة الإنجليزية",
      "تصميم وتحرير ملفات باللغة الإنجليزية",
    ],
    phone: "0501061221",
    email: "mtm.aldawoud@gmail.com",
  },
  {
    name: "سعد سلطان المحبوب",
    title: "إدارة الأعمال والتسويق",
    bio: "أعمل حاليًا في شركة BATSHARK في مجال إدارة الأعمال والتسويق، مع تركيز مستمر على بناء وتطوير العلاقات الاجتماعية والمهنية بما يدعم نمو الأعمال ويعزز حضور الشركة. أمتلك شغفًا بتطوير المشاريع وتحسين الأداء المؤسسي من خلال التخطيط والتحليل واتخاذ القرارات المبنية على البيانات.",
    experience: [
      "الإشراف الإداري في مؤسسة",
      "تعزيز ولاء العملاء",
      "تحسين خطة العمل",
      "رفع مستوى رضا العملاء",
      "دعم الموظفين وتحسين الأداء العام",
      "مساعد إداري – Unicharm Global",
      "التعامل المباشر مع الجمهور",
      "تقديم خدمة عملاء راقية",
      "تنظيم مواعيد المقابلات",
      "تسهيل الإجراءات الإدارية",
    ],
    skills: [
      "إدارة المشاريع (PMP)",
      "التسويق",
      "تحليل البيانات",
      "مؤشرات الأداء (KPIs)",
      "ICDL",
      "Power BI",
    ],
    phone: "0581998195",
    email: "s3d.snm@gmail.com",
  },
  {
    name: "نايف محمد المطيري",
    title: "التسويق والتقنية",
    bio: "مهتم بالعمل التطبيقي وتطوير المهارات التقنية والتسويقية، وأسعى لبناء خبرة عملية حقيقية من خلال العمل على مشاريع متنوعة.",
    experience: [
      "العمل على مشاريع تسويق صغيرة ومتوسطة",
      "تصميم مواقع واستخدام البرامج الحاسوبية",
      "التعامل المباشر مع العملاء وتحويل احتياجاتهم إلى حلول عملية",
    ],
    skills: [
      "تسويق رقمي للمشاريع المتوسطة",
      "تحليل البيانات الأساسية",
      "إجادة اللغة الإنجليزية",
      "تصميم وتحرير المحتوى",
      "استخدام البرامج الحاسوبية بكفاءة",
      "مهارات تواصل وبناء علاقات مهنية",
    ],
    phone: "0555623241",
    email: "nayf2011245.9@gmail.com",
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

              <Accordion type="single" collapsible className="space-y-2">
                {selectedMember.bio && (
                  <AccordionItem value="bio" className="border rounded-xl px-4 border-border">
                    <AccordionTrigger className="hover:no-underline gap-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-bold">نبذة</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {selectedMember.experience.length > 0 && (
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
                )}

                {selectedMember.skills.length > 0 && (
                  <AccordionItem value="skills" className="border rounded-xl px-4 border-border">
                    <AccordionTrigger className="hover:no-underline gap-3">
                      <div className="flex items-center gap-3">
                        <Wrench className="w-4 h-4 text-primary" />
                        <span className="font-bold">المهارات</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((s, i) => (
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
                )}

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
                        <span dir="ltr">{selectedMember.phone || "سيتم الإضافة قريبًا"}</span>
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
