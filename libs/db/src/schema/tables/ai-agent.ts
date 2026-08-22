import { isNull } from "drizzle-orm";
import { pgEnum, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { AI_AGENT_MODE_LIST } from "@/constants/ai-agent";
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
export const aiAgentId = uuid("ai_agent_id").references(() => aiAgentTable.id);

export const aiAgentModeSwitchingInstanceTableName =
  "ai_agent_mode_switching_instances";
export const aiAgentModeSwitchingInstanceTable = pgTable(
  aiAgentModeSwitchingInstanceTableName,
  {
    id,
    userId,
    aiAgentId,
    toMode: pgEnum("to_mode", AI_AGENT_MODE_LIST)().notNull(),
    ...timestampsWithDelete,
  },
);
