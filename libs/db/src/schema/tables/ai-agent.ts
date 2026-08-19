import { isNull } from "drizzle-orm";
import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

import { id } from "@/schema/helpers/id";
import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/tables/user";

export const aiAgentTableName = "ai_agents";

export const aiAgentTable = pgTable(
  aiAgentTableName,
  {
    id,
    userId,
    name: text("name").notNull(),
    ...timestampsWithDelete,
  },
  (table) => [
    uniqueIndex(`${aiAgentTableName}_user_id_name_uidx`)
      .on(table.userId, table.name)
      .where(isNull(table.deletedAt)),
  ],
);
