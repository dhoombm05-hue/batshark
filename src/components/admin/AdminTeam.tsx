import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Member {
  id?: string; name: string; title: string; bio: string;
  experience: string[]; skills: string[]; phone: string; email: string;
  is_trainee: boolean; sort_order: number;
}

const empty = (order: number): Member => ({ name: "", title: "", bio: "", experience: [], skills: [], phone: "", email: "", is_trainee: false, sort_order: order });
const lines = (v: string) => v.split("\n").map((x) => x.trim()).filter(Boolean);

const AdminTeam = () => {
  const { adminCall } = useAdmin();
  const { toast } = useToast();
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  const load = async () => {
    try { const r = await adminCall("get_team"); setTeam(r.team); }
    catch (e: any) { toast({ title: "خطأ", description: e.message, variant: "destructive" }); }
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const set = (i: number, patch: Partial<Member>) => setTeam((t) => t.map((m, j) => (j === i ? { ...m, ...patch } : m)));

  const save = async (i: number) => {
    const m = team[i];
    if (!m.name.trim()) return toast({ title: "اكتب الاسم أولاً", variant: "destructive" });
    setSaving(i);
    try {
      const { created_at, updated_at, ...payload } = m as any;
      await adminCall("upsert_member", payload);
      toast({ title: "تم الحفظ" });
      await load();
    } catch (e: any) { toast({ title: "خطأ", description: e.message, variant: "destructive" }); }
    setSaving(null);
  };

  const remove = async (i: number) => {
    const m = team[i];
    if (!m.id) return setTeam((t) => t.filter((_, j) => j !== i));
    if (!confirm(`حذف ${m.name}؟`)) return;
    try { await adminCall("delete_member", { id: m.id }); toast({ title: "تم الحذف" }); await load(); }
    catch (e: any) { toast({ title: "خطأ", description: e.message, variant: "destructive" }); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-5">
      <Button onClick={() => setTeam((t) => [...t, empty(t.length + 1)])}><Plus className="w-4 h-4 ml-2" />إضافة عضو</Button>
      {team.map((m, i) => (
        <div key={m.id ?? `new-${i}`} className="p-5 rounded-2xl border border-border bg-card space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="الاسم" value={m.name} onChange={(e) => set(i, { name: e.target.value })} />
            <Input placeholder="المسمى الوظيفي" value={m.title} onChange={(e) => set(i, { title: e.target.value })} />
            <Input dir="ltr" placeholder="رقم الجوال" value={m.phone} onChange={(e) => set(i, { phone: e.target.value })} />
            <Input dir="ltr" placeholder="البريد الإلكتروني" value={m.email} onChange={(e) => set(i, { email: e.target.value })} />
          </div>
          <Textarea placeholder="نبذة" value={m.bio} onChange={(e) => set(i, { bio: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-3">
            <Textarea placeholder="الخبرات (كل خبرة في سطر)" value={m.experience.join("\n")} onChange={(e) => set(i, { experience: lines(e.target.value) })} />
            <Textarea placeholder="المهارات (كل مهارة في سطر)" value={m.skills.join("\n")} onChange={(e) => set(i, { skills: lines(e.target.value) })} />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={m.is_trainee} onChange={(e) => set(i, { is_trainee: e.target.checked })} /> متدرب (فترة مؤقتة)
            </label>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => save(i)} disabled={saving === i}>
                {saving === i ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 ml-2" />حفظ</>}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => remove(i)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AdminTeam;
