import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
  if (query !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ message: "APIを叩く権限がありません。" });
  }

  const data = await req.json();
  const { id, email } = data.record;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const customer = await stripe.customers.create({ email });

  console.log(
    `Updating profile for id: ${id} with stripe_customer: ${customer.id}`
  );

  // IDが存在するか確認
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(`Error fetching profile: ${fetchError.message}`);
    return NextResponse.json({
      message: `Error fetching profile: ${fetchError.message}`,
    });
  }

  if (!existingProfile) {
    console.error(`Profile with id ${id} does not exist.`);
    return NextResponse.json({
      message: `Profile with id ${id} does not exist.`,
    });
  }

  console.log("Before updating profile in Supabase");

  const { data: updatedProfile, error } = await supabase
    .from("profile")
    .update({ stripe_customer: customer.id })
    .eq("id", id)
    .select();

  console.log("After updating profile in Supabase");
  console.log("Updated profile data:", updatedProfile);

  if (error) {
    console.error(`Error updating profile: ${error.message}`);
    return NextResponse.json({
      message: `Error updating profile: ${error.message}`,
    });
  }

  return NextResponse.json({
    message: `stripe customer created:${customer.id}`,
  });
}
