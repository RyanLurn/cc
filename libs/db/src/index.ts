import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import type { NeonPooledConnectionString } from "@/env";

import { relations } from "@/schema/relations";

export function createDb(connectionString: NeonPooledConnectionString) {
  const client = neon(connectionString);
  const db = drizzle({ client, relations });
  return db;
}

export type Db = ReturnType<typeof createDb>;
