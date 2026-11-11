import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Star, Phone, Mail, ChevronLeft, X, Wrench, Crown, Target, TrendingUp, Megaphone, Code } from "lucide-react";
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
  accentHsl: string; // HSL values for accent
  icon: typeof User;
}

const accents = ["217 91% 60%", "162 63% 41%", "270 60% 55%", "38 92% 50%", "340 65% 55%", "195 75% 50%", "24 90% 55%"];
const icons = [Crown, Target, Code, TrendingUp, Megaphone, Briefcase, User];

const TeamMembers = () => {
  const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(null);
  const [members, setMembers] = useState<MemberInfo[]>([]);

  useEffect(() => {
    supabase.from("team_members").select("*").order("sort_order").then(({ data }) => {
      if (!data) return;
      setMembers(data.map((m, i) => ({
        name: m.name,
        title: m.is_trainee && !m.title.includes("متدرب") ? `متدرب – ${m.title}` : m.title,
        bio: m.bio,
        experience: m.experience || [],
        skills: m.skills || [],
        phone: m.phone,
        email: m.email,
        accentHsl: accents[i % accents.length],
        icon: icons[i % icons.length],
      })));
    });
  }, []);

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
          {members.map((member, index) => {
            const IconComp = member.icon;
            return (
              <motion.button
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedMember(member)}
                className="group text-right p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Subtle gradient accent bar */}
                <div
                  className="absolute top-0 right-0 w-full h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to left, hsl(${member.accentHsl}), hsl(${member.accentHsl} / 0.3))` }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: `hsl(${member.accentHsl} / 0.1)`,
                    color: `hsl(${member.accentHsl})`,
                  }}
                >
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: `hsl(${member.accentHsl})` }}
                >
                  {member.title}
                </p>
                <div
                  className="flex items-center gap-2 text-xs font-bold group-hover:gap-3 transition-all"
                  style={{ color: `hsl(${member.accentHsl})` }}
                >
                  <span>عرض التفاصيل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            );
          })}
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
              className="bg-background rounded-3xl max-w-lg w-full shadow-elevated max-h-[85vh] overflow-y-auto"
            >
              {/* Header with accent gradient */}
              <div
                className="p-6 md:p-8 rounded-t-3xl relative"
                style={{
                  background: `linear-gradient(135deg, hsl(${selectedMember.accentHsl} / 0.08), hsl(${selectedMember.accentHsl} / 0.03))`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `hsl(${selectedMember.accentHsl} / 0.15)`,
                        color: `hsl(${selectedMember.accentHsl})`,
                      }}
                    >
                      <selectedMember.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{selectedMember.name}</h3>
                      <p
                        className="text-sm font-medium"
                        style={{ color: `hsl(${selectedMember.accentHsl})` }}
                      >
                        {selectedMember.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:px-8 md:pb-8 pt-2">
                <Accordion type="single" collapsible className="space-y-2">
                  {selectedMember.bio && (
                    <AccordionItem value="bio" className="border rounded-xl px-4 border-border">
                      <AccordionTrigger className="hover:no-underline gap-3">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4" style={{ color: `hsl(${selectedMember.accentHsl})` }} />
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
                          <Briefcase className="w-4 h-4" style={{ color: `hsl(${selectedMember.accentHsl})` }} />
                          <span className="font-bold">الخبرات</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {selectedMember.experience.map((exp, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ background: `hsl(${selectedMember.accentHsl})` }}
                              />
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
                          <Wrench className="w-4 h-4" style={{ color: `hsl(${selectedMember.accentHsl})` }} />
                          <span className="font-bold">المهارات</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.skills.map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full text-xs font-bold"
                              style={{
                                background: `hsl(${selectedMember.accentHsl} / 0.1)`,
                                color: `hsl(${selectedMember.accentHsl})`,
                              }}
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
                        <Phone className="w-4 h-4" style={{ color: `hsl(${selectedMember.accentHsl})` }} />
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamMembers;
