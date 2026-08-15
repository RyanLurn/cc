import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { id } from "@/schema/helpers/id";
import { timestampConfig, timestamps } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/tables/user";

export const sessionTable = pgTable(
  "sessions",
  {
    id,
    userId,
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", timestampConfig).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)],
);
