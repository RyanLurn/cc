export default {
  async fetch(request, env): Promise<Response> {
    const log = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
    };
    await env.pocQueue.send(log);
    return new Response("Success!");
  },
} satisfies ExportedHandler<Env>;
