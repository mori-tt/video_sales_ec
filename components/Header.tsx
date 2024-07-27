import { Button } from "./ui/button";
import Link from "next/link";
import AuthServerButton from "./auth/AuthServerButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Header = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();
  return (
    <div className="flex py-4 px-6 border-b border-gray-200">
      <Link href={"/"}>
        <Button variant="outline">Home</Button>
      </Link>
      {!!user.session && (
        <Link href={"/dashboard"} className="ml-4">
          <Button variant="outline">Dashboard</Button>
        </Link>
      )}

      <Link href={"/pricing"} className="ml-4">
        <Button variant="outline">Price</Button>
      </Link>
      <div className="ml-auto">
        <AuthServerButton />
      </div>
    </div>
  );
};

export default Header;
