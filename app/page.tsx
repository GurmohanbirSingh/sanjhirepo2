import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl">Reside Hub</h1>
      <p className="text-lg mt-4">Welcome to Reside Hub</p>

      <Link
        href="/login"
        className="mt-8 bg-white text-black py-2 px-8 rounded-lg"
      >
        Get Started
      </Link>
    </div>
  );
}
