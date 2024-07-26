"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";

function SubscriptionButton({ planId }: { planId: string }) {
  const processSubscription = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/subscription/${planId}`
    );

    if (!response.ok) {
      console.error("Failed to create subscription session");
      return;
    }

    const data = await response.json();
    console.log(data);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <Button onClick={async () => processSubscription()}>
      Subscription Agreement
    </Button>
  );
}

export default SubscriptionButton;
