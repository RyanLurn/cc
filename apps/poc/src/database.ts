import type { AppEvent, EventId } from "@/schemas";

export interface Database {
  appEventRecord: Record<EventId, AppEvent>;
}

export const database = {
  appEventRecord: {},
} satisfies Database;
