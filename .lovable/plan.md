

## المشكلة

حالياً عندما يرسل العميل طلب إعلان، يتم حفظ البيانات في قاعدة البيانات ويُفتح واتساب على جهاز **العميل**. لكن إذا لم يضغط العميل "إرسال" في واتساب، لن تصلك أي رسالة ولن تعرف بوجود طلب جديد.

## الحل

إعادة تفعيل إرسال إيميل تلقائي عبر Resend **بالتوازي** مع فتح واتساب. بهذا الشكل:
- كل طلب = إيميل تلقائي لك على `sharkshark1030@gmail.com` (مضمون 100%)
- واتساب يُفتح أيضاً للعميل كقناة تواصل إضافية

## التغييرات

### تعديل `src/pages/ScreenAdvertising.tsx`

إضافة استدعاء `send-ad-email` Edge Function بشكل غير معطّل (non-blocking) بعد حفظ البيانات في قاعدة البيانات وقبل فتح واتساب:

```typescript
// Send email notification (non-blocking)
supabase.functions.invoke("send-ad-email", {
  body: {
    advertiser_name: form.advertiser_name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    brand_name: form.brand_name.trim() || null,
    screen_location: form.screen_location,
    screens_count: form.screens_count,
    duration: form.duration,
    ad_type: form.ad_type,
    ad_link: form.ad_link.trim(),
    store_link: form.store_link.trim() || null,
    notes: form.notes || null,
  },
}).catch((err) => console.error("Email notification error:", err));

// Open WhatsApp directly with the message
const whatsappUrl = `https://wa.me/966560340081?text=${buildWhatsAppMessage()}`;
window.open(whatsappUrl, "_blank");
```

الدالة `send-ad-email` موجودة ومُعدّة مسبقاً ومفتاح `RESEND_API_KEY` مُضاف. إذا فشل إرسال الإيميل لأي سبب، لن يؤثر على تجربة العميل -- الخطأ يُسجّل فقط في السجلات.

### النتيجة

- العميل يعبئ النموذج ويضغط "إرسال"
- البيانات تُحفظ في قاعدة البيانات
- إيميل إشعار يُرسل لك تلقائياً (بدون تدخل العميل)
- واتساب يُفتح للعميل لإرسال الرسالة أيضاً
- لا يضيع أي طلب

