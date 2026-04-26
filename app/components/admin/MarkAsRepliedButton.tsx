"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MarkAsRepliedButtonProps {
  messageId: string;
  isReplied: boolean;
}

export default function MarkAsRepliedButton({ messageId, isReplied }: MarkAsRepliedButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMarkAsReplied = async () => {
    if (isReplied) return;
    
    setLoading(true);
    
    const res = await fetch(`http://localhost:3000/contactMessages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isReplied: true,
        status: "replied",
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
      onClick={handleMarkAsReplied}
      disabled={loading || isReplied}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isReplied 
          ? "bg-green-500/20 text-green-400 cursor-default"
          : "bg-amber-500 hover:bg-amber-600 text-black"
      }`}
    >
      {isReplied ? "پاسخ داده شد" : "علامت‌گذاری به عنوان پاسخ داده شده"}
    </button>
  );
}