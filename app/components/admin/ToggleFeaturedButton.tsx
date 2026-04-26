"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ToggleFeaturedButtonProps {
  blogId: string;
  isFeatured: boolean;
}

export default function ToggleFeaturedButton({ blogId, isFeatured }: ToggleFeaturedButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    
    const res = await fetch(`http://localhost:3000/blogs/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFeatured: !isFeatured,
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
        isFeatured 
          ? "text-amber-500 hover:text-amber-400" 
          : "text-gray-500 hover:text-gray-400"
      }`}
      title={isFeatured ? "حذف از ویژه" : "افزودن به ویژه"}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
}