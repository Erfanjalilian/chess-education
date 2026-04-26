"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ToggleMessageStatusButtonProps {
  messageId: string;
  isRead: boolean;
  isReplied: boolean;
}

export default function ToggleMessageStatusButton({ 
  messageId, 
  isRead, 
  isReplied 
}: ToggleMessageStatusButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (isReplied) return;
    
    setLoading(true);
    
    const res = await fetch(`http://localhost:3000/contactMessages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isRead: !isRead,
        status: !isRead ? "read" : "unread",
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
      disabled={loading || isReplied}
      className={`p-2 transition-colors ${
        isReplied 
          ? "text-gray-600 cursor-not-allowed" 
          : isRead 
            ? "text-yellow-500 hover:text-yellow-400" 
            : "text-blue-500 hover:text-blue-400"
      }`}
      title={isReplied ? "پاسخ داده شده" : isRead ? "علامت‌گذاری به عنوان نخوانده" : "علامت‌گذاری به عنوان خوانده شده"}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isRead ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
      </svg>
    </button>
  );
}