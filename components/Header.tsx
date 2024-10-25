import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-8 py-4 mb-8">
      <p className="text-xl">RH</p>
      <Link href="/login" className="p-2 rounded-lg bg-red-500/20 border border-red-500">
        <LogOutIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}
