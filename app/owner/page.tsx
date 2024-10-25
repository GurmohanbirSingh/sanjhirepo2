"use client";

import checkUser from "@/api/common/checkUser";
import { useEffect } from "react";

export default function OwnerPage() {
  useEffect(() => {
    const checkOwnership = async () => {
      await checkUser().then((isOwner) => {
        if (!isOwner) {
          window.location.href = "/login";
        }
      });
    };

    checkOwnership();
  }, []);

  return (
    <div>
      <h1>Owner Page</h1>
    </div>
  );
}
