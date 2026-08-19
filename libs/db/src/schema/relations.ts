import { defineRelations } from "drizzle-orm";

import { accountTable } from "@/schema/tables/account";
import { aiAgentTable } from "@/schema/tables/ai-agent";
import { sessionTable } from "@/schema/tables/session";
import { userTable } from "@/schema/tables/user";
import { verificationTable } from "@/schema/tables/verification";

export const relations = defineRelations(
  {
    userTable,
    sessionTable,
    accountTable,
    verificationTable,
    aiAgentTable,
  },
  ({ many, one, userTable, sessionTable, accountTable, aiAgentTable }) => ({
    userTable: {
      sessions: many.sessionTable({
        from: userTable.id,
        to: sessionTable.userId,
      }),
      accounts: many.accountTable({
        from: userTable.id,
        to: accountTable.userId,
      }),
      aiAgents: many.aiAgentTable({
        from: userTable.id,
        to: aiAgentTable.userId,
        where: {
          deletedAt: undefined,
        },
      }),
    },
    sessionTable: {
      user: one.userTable({
        from: sessionTable.userId,
        to: userTable.id,
      }),
    },
    accountTable: {
      user: one.userTable({
        from: accountTable.userId,
        to: userTable.id,
      }),
    },
    aiAgentTable: {
      user: one.userTable({
        from: aiAgentTable.userId,
        to: userTable.id,
      }),
    },
  }),
);
