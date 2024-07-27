import SubscriptionManagementButton from "@/components/checkout/SubscriptionManagementButton";
import { Database } from "@/lib/database.types";
import { supabaseServer } from "@/lib/supabaseServer";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

const getProfileData = async (supabase: SupabaseClient<Database>) => {
  const { data: profile } = await supabase.from("profile").select("*").single();
  return profile;
};

const Dashboard = async () => {
  const supabase = supabaseServer();
  const profile = await getProfileData(supabase);
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">User Management Dashboard</h1>
      <div>
        <div className="mb-3">
          {profile?.is_subscribed
            ? `Currently on a plan: ${profile.interval}`
            : "Not subscribed to a plan"}
        </div>
        <SubscriptionManagementButton />
      </div>
    </div>
  );
};

export default Dashboard;
