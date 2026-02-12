const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ZAPIER_WEBHOOK_URL = Deno.env.get("ZAPIER_WEBHOOK_URL");
  if (!ZAPIER_WEBHOOK_URL) {
    return new Response(JSON.stringify({ error: "Webhook URL not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const {
      advertiser_name, phone, email, brand_name,
      screen_location, screens_count, duration,
      ad_type, ad_link, store_link, notes, request_id
    } = body;

    // Send to Zapier webhook
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `طلب إعلان جديد – ${advertiser_name}`,
        to_email: "sharkshark1030@gmail.com",
        request_id,
        advertiser_name,
        phone,
        email,
        brand_name: brand_name || "—",
        screen_location,
        screens_count,
        duration,
        ad_type,
        ad_link,
        store_link: store_link || "—",
        notes: notes || "—",
        date: new Date().toLocaleDateString("ar-SA", {
          year: "numeric", month: "long", day: "numeric",
          hour: "2-digit", minute: "2-digit",
        }),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Zapier webhook failed [${response.status}]: ${errText}`);
    }

    await response.text();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending to Zapier:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
