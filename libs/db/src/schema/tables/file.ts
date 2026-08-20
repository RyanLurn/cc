import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { ACTOR_KIND_LIST } from "@/constants";
import { id } from "@/schema/helpers/id";
import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/tables/user";

export const fileTableName = "files";

export const fileTable = pgTable(fileTableName, {
  id,
  userId,
  name: text("name").notNull(),
  originatorKind: pgEnum("originator_kind", ACTOR_KIND_LIST)().notNull(),
  originatorId: uuid("originator_id"),
  ...timestampsWithDelete,
});
