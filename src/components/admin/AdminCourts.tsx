import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Save, X, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Court {
  id: string;
  origin: string;
  court_id: string;
  name: string;
  tag: string;
  price: number;
  usage_type: string;
  dimensions: string;
  glass: string;
  frame: string;
  turf: string;
  warranty: string;
  sort_order: number;
}

const emptyForm: Omit<Court, "id"> = {
  origin: "spanish",
  court_id: "",
  name: "",
  tag: "",
  price: 0,
  usage_type: "",
  dimensions: "20m × 10m",
  glass: "",
  frame: "",
  turf: "",
  warranty: "",
  sort_order: 0,
};

const AdminCourts = () => {
  const { adminCall } = useAdmin();
  const { toast } = useToast();
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminCall("get_courts");
      setCourts(res.courts || []);
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (adding) {
        await adminCall("add_court", form);
        toast({ title: "تم إضافة الملعب" });
      } else {
        await adminCall("update_court", { id: editingId, ...form });
        toast({ title: "تم تحديث الملعب" });
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
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await adminCall("delete_court", { id });
      toast({ title: "تم حذف الملعب" });
      await load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
  };

  const startEdit = (court: Court) => {
    setEditingId(court.id);
    setAdding(false);
    setForm({ ...court });
  };

  const startAdd = () => {
    setAdding(true);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const cancel = () => { setEditingId(null); setAdding(false); };

  const Field = ({ label, field, type = "text" }: { label: string; field: string; type?: string }) => (
    <div>
      <label className="text-xs text-muted-foreground block mb-1">{label}</label>
      <Input
        type={type}
        value={form[field] || ""}
        onChange={(e) => setForm({ ...form, [field]: type === "number" ? Number(e.target.value) : e.target.value })}
        className="text-sm"
      />
    </div>
  );

  if (loading) return <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">ملاعب البادل ({courts.length})</h2>
        <Button onClick={startAdd} size="sm" disabled={adding || !!editingId}>
          <Plus className="w-4 h-4 ml-1" /> إضافة ملعب
        </Button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="p-6 rounded-2xl bg-card border border-padel/30 mb-6">
          <h3 className="font-bold mb-4">إضافة ملعب جديد</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">المصدر</label>
              <select
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="spanish">إسباني</option>
                <option value="chinese">صيني</option>
              </select>
            </div>
            <Field label="معرّف الملعب" field="court_id" />
            <Field label="الاسم" field="name" />
            <Field label="الفئة" field="tag" />
            <Field label="السعر" field="price" type="number" />
            <Field label="الاستخدام" field="usage_type" />
            <Field label="الأبعاد" field="dimensions" />
            <Field label="الزجاج" field="glass" />
            <Field label="الهيكل" field="frame" />
            <Field label="العشب" field="turf" />
            <Field label="الضمان" field="warranty" />
            <Field label="الترتيب" field="sort_order" type="number" />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={saving} size="sm">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 ml-1" /> حفظ</>}
            </Button>
            <Button onClick={cancel} variant="outline" size="sm"><X className="w-4 h-4 ml-1" /> إلغاء</Button>
          </div>
        </div>
      )}

      {/* Courts list */}
      <div className="space-y-3">
        {courts.map((court) => (
          <div key={court.id} className="p-4 rounded-xl bg-card border border-border">
            {editingId === court.id ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Field label="الاسم" field="name" />
                  <Field label="الفئة" field="tag" />
                  <Field label="السعر" field="price" type="number" />
                  <Field label="الاستخدام" field="usage_type" />
                  <Field label="الأبعاد" field="dimensions" />
                  <Field label="الزجاج" field="glass" />
                  <Field label="الهيكل" field="frame" />
                  <Field label="العشب" field="turf" />
                  <Field label="الضمان" field="warranty" />
                  <Field label="الترتيب" field="sort_order" type="number" />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSave} disabled={saving} size="sm">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 ml-1" /> حفظ</>}
                  </Button>
                  <Button onClick={cancel} variant="outline" size="sm"><X className="w-4 h-4 ml-1" /> إلغاء</Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-padel/10 text-padel font-bold">
                      {court.origin === "spanish" ? "🇪🇸" : "🇨🇳"} {court.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mt-1">{court.name}</h3>
                  <p className="text-sm text-muted-foreground">{court.usage_type} — {court.price.toLocaleString()} ريال</p>
                </div>
                <div className="flex gap-1">
                  <Button onClick={() => startEdit(court)} variant="ghost" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleDelete(court.id)} variant="ghost" size="sm" className="text-destructive">
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

export default AdminCourts;
