import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const client = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBKEY
);

export const supabase = client.storage.from("user-folders");
