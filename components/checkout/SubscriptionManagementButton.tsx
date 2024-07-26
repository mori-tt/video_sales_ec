"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SubscriptionManagementButton = () => {
  const router = useRouter();
  // const loadPortal = async () => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/portal`
  //   );
  //   const data = await response.json();
  //   router.push(data.url);
  // };
  const loadPortal = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/portal`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.url) {
        throw new Error("URL is missing in the response");
      }
      router.push(data.url);
    } catch (error) {
      console.error("Failed to load portal:", error);
    }
  };
  return (
    <div>
      <Button onClick={loadPortal}>SubscriptionManagement</Button>
    </div>
  );
};

export default SubscriptionManagementButton;
