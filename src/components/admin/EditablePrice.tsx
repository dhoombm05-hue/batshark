import { useState } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  table: string;
  id: string;
  field: string;
  value: number;
  onUpdated?: (newValue: number) => void;
  className?: string;
  children: React.ReactNode;
}

const EditablePrice = ({ table, id, field, value, onUpdated, className = "", children }: Props) => {
  const { isAdmin, adminCall } = useAdmin();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(String(value));
  const [saving, setSaving] = useState(false);

  const actionMap: Record<string, string> = {
    padel_courts: "update_court",
    site_settings: "update_setting",
  };

  const handleSave = async () => {
    const num = Number(newValue);
    if (isNaN(num) || num <= 0) {
      toast({ title: "خطأ", description: "أدخل رقم صحيح", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const action = actionMap[table] || `update_${table.replace(/s$/, "")}`;
      await adminCall(action, { id, [field]: num });
      toast({ title: "تم التحديث ✅" });
      onUpdated?.(num);
      setEditing(false);
    } catch (e: any) {
      toast({ title: "خطأ", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (!isAdmin) return <>{children}</>;

  if (editing) {
    return (
      <div className="inline-flex items-center gap-2">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-32 px-3 py-2 rounded-lg border border-primary/30 bg-background text-foreground text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <button onClick={handleSave} disabled={saving} className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
        </button>
        <button onClick={() => { setEditing(false); setNewValue(String(value)); }} className="w-8 h-8 rounded-lg bg-destructive text-white flex items-center justify-center hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <span className={`relative group/price inline-flex items-center gap-1 cursor-pointer ${className}`} onClick={() => setEditing(true)}>
      {children}
      <Pencil className="w-4 h-4 opacity-0 group-hover/price:opacity-100 transition-opacity text-primary" />
    </span>
  );
};

export default EditablePrice;
