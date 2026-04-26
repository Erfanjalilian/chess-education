"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ToggleStatusButtonProps {
  blogId: string;
  currentStatus: string;
}

export default function ToggleStatusButton({ blogId, currentStatus }: ToggleStatusButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const isPublished = currentStatus === "published";
  const newStatus = isPublished ? "draft" : "published";

  const handleToggle = async () => {
    setLoading(true);
    
    const res = await fetch(`http://localhost:3000/blogs/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
        publishedAt: isPublished ? null : new Date().toISOString(),
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
        isPublished 
          ? "text-yellow-500 hover:text-yellow-400" 
          : "text-green-500 hover:text-green-400"
      }`}
      title={isPublished ? "عدم انتشار" : "انتشار"}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isPublished ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M12 12h.01" />
        )}
      </svg>
    </button>
  );
}