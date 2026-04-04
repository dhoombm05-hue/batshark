import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Save, X, Loader2, Eye, EyeOff } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Section {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  route: string;
  is_visible: boolean;
  sort_order: number;
}

const AdminSections = () => {
  const { adminCall } = useAdmin();
  const { toast } = useToast();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminCall("get_sections");
      setSections(res.sections || []);
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleVisibility = async (section: Section) => {
    try {
      await adminCall("update_section", { id: section.id, is_visible: !section.is_visible });
      toast({ title: section.is_visible ? "تم إخفاء القسم" : "تم إظهار القسم" });
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (adding) {
        await adminCall("add_section", form);
        toast({ title: "تم إضافة القسم" });
      } else {
        await adminCall("update_section", { id: editingId, ...form });
        toast({ title: "تم تحديث القسم" });
      }
      setEditingId(null);
      setAdding(false);
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) return;
    try {
      await adminCall("delete_section", { id });
      toast({ title: "تم حذف القسم" });
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
  };

  const Field = ({ label, field }: { label: string; field: string }) => (
    <div>
      <label className="text-xs text-muted-foreground block mb-1">{label}</label>
      <Input
        value={form[field] || ""}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        className="text-sm"
      />
    </div>
  );

  if (loading) return <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">أقسام الأعمال ({sections.length})</h2>
        <Button onClick={() => { setAdding(true); setForm({ slug: "", name_ar: "", name_en: "", description_ar: "", route: "/", is_visible: true, sort_order: sections.length }); }} size="sm" disabled={adding || !!editingId}>
          <Plus className="w-4 h-4 ml-1" /> إضافة قسم
        </Button>
      </div>

      {adding && (
        <div className="p-6 rounded-2xl bg-card border border-primary/30 mb-6">
          <h3 className="font-bold mb-4">إضافة قسم جديد</h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="المعرّف (slug)" field="slug" />
            <Field label="الاسم بالعربي" field="name_ar" />
            <Field label="الاسم بالإنجليزي" field="name_en" />
            <Field label="الوصف" field="description_ar" />
            <Field label="الرابط (مثل /padel-courts)" field="route" />
            <div>
              <label className="text-xs text-muted-foreground block mb-1">الترتيب</label>
              <Input type="number" value={form.sort_order || 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="text-sm" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={saving} size="sm">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 ml-1" /> حفظ</>}
            </Button>
            <Button onClick={() => setAdding(false)} variant="outline" size="sm"><X className="w-4 h-4 ml-1" /> إلغاء</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.id} className={`p-4 rounded-xl border ${section.is_visible ? "bg-card border-border" : "bg-muted/50 border-border opacity-60"}`}>
            {editingId === section.id ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="الاسم بالعربي" field="name_ar" />
                  <Field label="الاسم بالإنجليزي" field="name_en" />
                  <Field label="الوصف" field="description_ar" />
                  <Field label="الرابط" field="route" />
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">الترتيب</label>
                    <Input type="number" value={form.sort_order || 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="text-sm" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSave} disabled={saving} size="sm">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 ml-1" /> حفظ</>}
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" size="sm"><X className="w-4 h-4 ml-1" /> إلغاء</Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{section.name_ar}</h3>
                  <p className="text-sm text-muted-foreground">{section.name_en} — {section.route}</p>
                </div>
                <div className="flex gap-1">
                  <Button onClick={() => toggleVisibility(section)} variant="ghost" size="sm" title={section.is_visible ? "إخفاء" : "إظهار"}>
                    {section.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button onClick={() => { setEditingId(section.id); setForm({ ...section }); }} variant="ghost" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleDelete(section.id)} variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSections;
