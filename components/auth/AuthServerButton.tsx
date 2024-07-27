import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthClientButton from "./AuthClientButton";
import { supabaseServer } from "@/lib/supabaseServer";

const AuthServerButton = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getSession();
  const session = user.session;

  return <AuthClientButton session={session} />;
};

export default AuthServerButton;
