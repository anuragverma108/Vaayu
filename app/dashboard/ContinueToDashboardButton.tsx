"use client";
export default function ContinueToDashboardButton() {
  return (
    <button
      onClick={() => window.location.href = "/dashboard/dashboard"}
      className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-lg transition-colors w-full block text-center"
    >
      Continue to dashboard
    </button>
  );
} 