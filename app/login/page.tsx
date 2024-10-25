"use client";

import fetchUserData from "@/api/common/fetchUserData";
import signIn from "@/api/common/login";
import Image from "next/image";
import { useEffect, useState } from "react";

function LoadingIcon() {
  return (
    <div className="inset-0 flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border border-black border-t-transparent" />
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await signIn(email, password);

      if (data.user) {
        localStorage.setItem("user_id", data.user.id);
        fetchUserData(data.user.id).then((data) => {
          setLoading(false);

          if (!data) return;

          if (data[0].is_owner) {
            window.location.href = "/owner";
          } else {
            window.location.href = "/tenant";
          }
        });
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="grid lg:grid-cols-2 h-screen items-center justify-center">
      <div className="px-16 lg:min-w-96 lg:w-full">
        <h1 className="text-3xl font-medium mb-8">Welcome back to ResideHub</h1>
        <form
          className="flex flex-col gap-4 [&>input]:py-2 [&>input]:bg-transparent [&>input]:border-b [&>input]:border-neutral-700 focus-visible:[&>input]:outline-none"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="mt-8 bg-white text-black py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                Loading
                <LoadingIcon />
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <p className="text-center mt-16">
          Don't have an account,{" "}
          <a href="#" className="font-bold underline">
            Sign up free
          </a>
        </p>
      </div>
      <div
        className="hidden lg:flex items-end h-screen overflow-hidden"
        style={{ borderRadius: "4rem 0 0 4rem" }}
      >
        <Image
          src="/login-bg.jpg"
          className="min-h-screen w-auto"
          alt=""
          quality={100}
          width={1000}
          height={2000}
        />
      </div>
    </div>
  );
}
