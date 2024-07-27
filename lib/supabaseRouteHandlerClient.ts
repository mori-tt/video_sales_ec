import { cookies } from "next/headers";
import { Database } from "./database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const supabaseRouteHandlerClient = () => {
  cookies().getAll();
  return createRouteHandlerClient<Database>({ cookies });
};
