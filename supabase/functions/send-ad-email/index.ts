const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "Resend API key not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const {
      advertiser_name, phone, email, brand_name,
      screen_location, screens_count, duration,
      ad_type, ad_link, store_link, notes, request_id,
    } = body;

    const dateStr = new Date().toLocaleDateString("ar-SA", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const htmlBody = `
    <div dir="rtl" style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🦈 طلب إعلان جديد</h1>
        <p style="color:#a0aec0;margin:8px 0 0;font-size:14px;">${dateStr}</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;width:140px;">رقم الطلب</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${request_id || "—"}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;background:#fafafa;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">اسم المعلن</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${advertiser_name}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">رقم الجوال</td>
            <td style="padding:12px 8px;"><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;background:#fafafa;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">البريد الإلكتروني</td>
            <td style="padding:12px 8px;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">اسم البراند</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${brand_name || "—"}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;background:#fafafa;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">موقع الشاشة</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${screen_location}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">عدد الشاشات</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${screens_count}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;background:#fafafa;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">المدة</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${duration}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">نوع الإعلان</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${ad_type}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;background:#fafafa;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">رابط الإعلان</td>
            <td style="padding:12px 8px;"><a href="${ad_link}" style="color:#2563eb;text-decoration:none;">${ad_link}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">رابط المتجر</td>
            <td style="padding:12px 8px;">${store_link ? `<a href="${store_link}" style="color:#2563eb;text-decoration:none;">${store_link}</a>` : "—"}</td>
          </tr>
          ${notes && notes !== "—" ? `
          <tr style="background:#fafafa;">
            <td style="padding:12px 8px;font-weight:bold;color:#555;">ملاحظات</td>
            <td style="padding:12px 8px;color:#1a1a2e;">${notes}</td>
          </tr>` : ""}
        </table>
      </div>
      <div style="background:#f8f9fa;padding:16px;text-align:center;font-size:13px;color:#888;">
        Bat Shark Media – نظام الإشعارات التلقائية
      </div>
    </div>`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Bat Shark <onboarding@resend.dev>",
        to: ["messidhoom291@gmail.com"],
        subject: `طلب إعلان جديد – ${advertiser_name}`,
        html: htmlBody,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      throw new Error(resendData.message || `Resend failed [${resendRes.status}]`);
    }

    console.log("Email sent successfully:", resendData.id);

    return new Response(JSON.stringify({ success: true, email_id: resendData.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
