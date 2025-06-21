"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@civic/auth/react";
import { getStoredWallet, createWallet, storeWallet } from "@/lib/aptos";

export default function ContinueToDashboardButton() {
  const [isAuthed, setIsAuthed] = useState(false);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      // Check if wallet exists for this specific user, if not create one
      const existingWallet = getStoredWallet(user.id);
      if (!existingWallet) {
        const newWallet = createWallet();
        storeWallet(newWallet, user.id);
        console.log("Created new wallet for user:", user.id, newWallet.address);
      }
      setIsAuthed(true);
    } else {
      setIsAuthed(false);
    }
  }, [user, isLoading]);

  if (!isAuthed) return null;

  return (
    <Link href="/dashboard/dashboard">
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        Continue to Dashboard
      </button>
    </Link>
  );
} 