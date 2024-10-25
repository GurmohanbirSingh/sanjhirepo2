"use client";

import checkUser from "@/api/common/checkUser";
import Header from "@/components/Header";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <main>
      <Header />
      <div className={`antialiased`}>{children}</div>
    </main>
  );
}
