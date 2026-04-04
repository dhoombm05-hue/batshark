import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!ADMIN_PASSWORD || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Server configuration error" }, 500);
  }

  try {
    const body = await req.json();
    const { password, action, data } = body;

    if (password !== ADMIN_PASSWORD) {
      return json({ error: "كلمة المرور غير صحيحة" }, 401);
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    switch (action) {
      case "login": {
        return json({ success: true });
      }

      // ===== PADEL COURTS =====
      case "get_courts": {
        const { data: courts, error } = await supabase
          .from("padel_courts")
          .select("*")
          .order("origin")
          .order("sort_order");
        if (error) throw error;
        return json({ courts });
      }

      case "update_court": {
        const { id, ...updates } = data;
        updates.updated_at = new Date().toISOString();
        const { error } = await supabase.from("padel_courts").update(updates).eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      case "add_court": {
        const { error } = await supabase.from("padel_courts").insert(data);
        if (error) throw error;
        return json({ success: true });
      }

      case "delete_court": {
        const { error } = await supabase.from("padel_courts").delete().eq("id", data.id);
        if (error) throw error;
        return json({ success: true });
      }

      // ===== BUSINESS SECTIONS =====
      case "get_sections": {
        const { data: sections, error } = await supabase
          .from("business_sections")
          .select("*")
          .order("sort_order");
        if (error) throw error;
        return json({ sections });
      }

      case "update_section": {
        const { id, ...updates } = data;
        updates.updated_at = new Date().toISOString();
        const { error } = await supabase.from("business_sections").update(updates).eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      case "add_section": {
        const { error } = await supabase.from("business_sections").insert(data);
        if (error) throw error;
        return json({ success: true });
      }

      case "delete_section": {
        const { error } = await supabase.from("business_sections").delete().eq("id", data.id);
        if (error) throw error;
        return json({ success: true });
      }

      // ===== SITE IMAGES =====
      case "get_images": {
        const { data: images, error } = await supabase.from("site_images").select("*");
        if (error) throw error;
        return json({ images });
      }

      case "upsert_image": {
        data.updated_at = new Date().toISOString();
        const { error } = await supabase
          .from("site_images")
          .upsert(data, { onConflict: "page,section" });
        if (error) throw error;
        return json({ success: true });
      }

      case "delete_image": {
        const { error } = await supabase.from("site_images").delete().eq("id", data.id);
        if (error) throw error;
        return json({ success: true });
      }

      // ===== UPLOAD SIGNED URL =====
      case "get_upload_url": {
        const { fileName } = data;
        const path = `site/${Date.now()}-${fileName}`;
        const { data: signedData, error } = await supabase.storage
          .from("site-assets")
          .createSignedUploadUrl(path);
        if (error) throw error;
        return json({ signedUrl: signedData.signedUrl, path, publicUrl: `${SUPABASE_URL}/storage/v1/object/public/site-assets/${path}` });
      }

      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (error) {
    console.error("Admin API error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return json({ error: msg }, 500);
  }
});
