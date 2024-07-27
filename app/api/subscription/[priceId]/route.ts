import { supabaseRouteHandlerClient } from "@/lib/supabaseRouteHandlerClient";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

export async function GET(
  req: NextRequest,
  { params }: { params: { priceId: string } }
) {
  const supabase = supabaseRouteHandlerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { data: stripe_customer_data } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  if (!stripe_customer_data) {
    return NextResponse.json("Stripe customer not found", { status: 404 });
  }

  const priceId = params.priceId;

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_data?.stripe_customer!,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/canceled`,
  });

  return NextResponse.json({ id: session.id });
}

export async function POST(req: NextRequest, res: NextResponse) {}
