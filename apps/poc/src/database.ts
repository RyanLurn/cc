import type { AppEvent, EventId } from "@/schemas";

export interface Database {
  appEvents: Record<EventId, AppEvent>;
}

export const database = {
  appEvents: {},
} satisfies Database;
