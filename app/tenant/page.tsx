"use client";

import checkUser from "@/api/common/checkUser";
import { useEffect, useState } from "react";
import UserScreen from "./User";

export default function TenantPage() {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("user_id")!);

    const checkOwnership = async () => {
      await checkUser().then((isOwner) => {
        if (isOwner) {
          window.location.href = "/login";
        }
      });
    };

    checkOwnership();
  }, []);
  return (
    <div>
      <h1>Tenant Page</h1>
      
      <UserScreen userId={user} />
    </div>
  );
}
