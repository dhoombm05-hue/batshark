import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD");
  if (!ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Server config error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const body = await req.json();
    const { password, action, ...data } = body;

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "كلمة المرور غير صحيحة" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result;

    if (action === "add") {
      const { data: inserted, error } = await supabase
        .from("project_videos")
        .insert({
          project: data.project,
          title: data.title,
          video_type: data.video_type,
          youtube_url: data.youtube_url || null,
          storage_path: data.storage_path || null,
          sort_order: data.sort_order || 0,
        })
        .select()
        .single();
      if (error) throw error;
      result = inserted;
    } else if (action === "delete") {
      // If uploaded video, delete from storage too
      if (data.storage_path) {
        await supabase.storage.from("project-videos").remove([data.storage_path]);
      }
      const { error } = await supabase
        .from("project_videos")
        .delete()
        .eq("id", data.id);
      if (error) throw error;
      result = { success: true };
    } else if (action === "upload-url") {
      // Generate a signed upload URL
      const fileName = `${data.project}/${Date.now()}-${data.fileName}`;
      const { data: uploadData, error } = await supabase.storage
        .from("project-videos")
        .createSignedUploadUrl(fileName);
      if (error) throw error;
      result = { ...uploadData, path: fileName };
    } else {
      throw new Error("Invalid action");
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
