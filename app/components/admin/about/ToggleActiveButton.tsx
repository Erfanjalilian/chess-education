"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ToggleActiveButtonProps {
  type: string;
  id: string;
  isActive: boolean;
  endpoint: string;
}

export default function ToggleActiveButton({ type, id, isActive, endpoint }: ToggleActiveButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    
    const res = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isActive: !isActive,
        updatedAt: new Date().toISOString(),
      }),
    });
    
    if (res.ok) {
      router.refresh();
    }
    
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 transition-colors ${
        isActive 
          ? "text-green-500 hover:text-green-400" 
          : "text-gray-500 hover:text-gray-400"
      }`}
      title={isActive ? "غیرفعال کردن" : "فعال کردن"}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isActive ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        )}
      </svg>
    </button>
  );
}