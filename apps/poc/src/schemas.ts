import { z } from "zod";

import {
  APP_EVENT_DISCRIMINATOR,
  CHAT_MESSAGE_SENT_EVENT_KIND,
  CHAT_MESSAGES_READ_EVENT_KIND,
  EVENT_KIND_LIST,
  EVENT_STATUS_LIST,
  PASS_TURN_EVENT_KIND,
} from "@/constants";

export const EventIdSchema = z.uuid().brand<"EventId">();
export type EventId = z.infer<typeof EventIdSchema>;

export const EventKindSchema = z.enum(EVENT_KIND_LIST);
export type EventKind = z.infer<typeof EventKindSchema>;

export const EventStatusSchema = z.enum(EVENT_STATUS_LIST);
export type EventStatus = z.infer<typeof EventStatusSchema>;

export const BaseEventSchema = z.object({
  id: EventIdSchema,
  [APP_EVENT_DISCRIMINATOR]: EventKindSchema,
  status: EventStatusSchema,
  data: z.json(),
});
export type BaseEvent = z.infer<typeof BaseEventSchema>;

export const PassTurnEventSchema = BaseEventSchema.safeExtend({
  [APP_EVENT_DISCRIMINATOR]: z.literal(PASS_TURN_EVENT_KIND),
  data: z.null(),
});
export type PassTurnEvent = z.infer<typeof PassTurnEventSchema>;

export const ChatMessagesReadEventSchema = BaseEventSchema.safeExtend({
  [APP_EVENT_DISCRIMINATOR]: z.literal(CHAT_MESSAGES_READ_EVENT_KIND),
  data: z.object({
    reader: z.string(),
    readMessages: z.array(
      z.object({ content: z.string(), sentAt: z.iso.datetime() }),
    ),
    lastReadAt: z.iso.datetime(),
  }),
});
export type ChatMessagesReadEvent = z.infer<typeof ChatMessagesReadEventSchema>;

export const ChatMessageSentEventSchema = BaseEventSchema.safeExtend({
  [APP_EVENT_DISCRIMINATOR]: z.literal(CHAT_MESSAGE_SENT_EVENT_KIND),
  data: z.object({
    sender: z.string(),
    content: z.string(),
    sentAt: z.iso.datetime(),
  }),
});
export type ChatMessageSentEvent = z.infer<typeof ChatMessageSentEventSchema>;

export const AppEventSchema = z.discriminatedUnion(APP_EVENT_DISCRIMINATOR, [
  PassTurnEventSchema,
  ChatMessageSentEventSchema,
  ChatMessagesReadEventSchema,
]);
export type AppEvent = z.infer<typeof AppEventSchema>;
