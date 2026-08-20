import { z } from "zod";

import { database } from "@/database";
import { QueueMessageBodySchema } from "@/schemas";

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
    // Parse message bodies for event ids
    const parsedMessageBodyList = z
      .array(QueueMessageBodySchema)
      .parse(batch.messages.map((message) => message.body));

    // Get the referenced events
    const _appEventList = parsedMessageBodyList
      .map(({ id }) => {
        const foundEvent = database.appEventRecord[id];
        if (foundEvent) {
          foundEvent.status = "RECEIVED";
        } else {
          console.warn(`Failed to find event with id: ${id}`);
        }
        return foundEvent;
      })
      .filter((appEvent) => appEvent !== undefined);
  },
} satisfies ExportedHandler<Env>;
