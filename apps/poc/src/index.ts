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
  async queue(batch): Promise<void> {
    for (const message of batch.messages) {
      console.log("consumed from our queue:", JSON.stringify(message.body));
    }
  },
} satisfies ExportedHandler<Env>;
