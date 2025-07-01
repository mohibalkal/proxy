export default {
  async fetch(request, env, ctx) {
    const urlParam = new URL(request.url).searchParams.get("url");
    if (!urlParam) {
      return new Response("Missing url", { status: 400 });
    }

    const headers = {
      "origin": "https://moviebox.ng",
      "referer": "https://moviebox.ng"
    };
    // مرر Range وUser-Agent من الطلب الأصلي
    if (request.headers.get("range")) {
      headers["range"] = request.headers.get("range");
    }
    if (request.headers.get("user-agent")) {
      headers["user-agent"] = request.headers.get("user-agent");
    }

    try {
      const targetRes = await fetch(decodeURIComponent(urlParam), {
        headers,
        redirect: "manual"
      });

      // تمرير الهيدرات المهمة فقط
      const allowed = [
        "content-type", "content-length", "accept-ranges", "content-range",
        "content-disposition", "cache-control", "pragma", "expires", "last-modified", "etag"
      ];
      const respHeaders = new Headers();
      for (const [key, value] of targetRes.headers.entries()) {
        if (allowed.includes(key.toLowerCase())) {
          respHeaders.set(key, value);
        }
      }
      if (!respHeaders.has("content-type")) {
        respHeaders.set("content-type", "video/mp4");
      }

      return new Response(targetRes.body, {
        status: targetRes.status,
        headers: respHeaders
      });
    } catch (e) {
      return new Response("Proxy error: " + e.message, { status: 500 });
    }
  }
}
