"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReplyToMessageProps {
  messageId: string;
  userEmail: string;
  userName: string;
}

export default function ReplyToMessage({ messageId, userEmail, userName }: ReplyToMessageProps) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      setError("لطفاً متن پاسخ را وارد کنید");
      return;
    }
    
    setSending(true);
    setError(null);
    setSuccess(null);
    
    // در اینجا می‌توانید ایمیل واقعی ارسال کنید
    // برای حال حاضر فقط در کنسول لاگ می‌شود و وضعیت پیام به‌روز می‌شود
    
    console.log("ارسال پاسخ به:", userEmail);
    console.log("متن پاسخ:", replyText);
    
    // به‌روزرسانی وضعیت پیام
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
      setSuccess("پاسخ با موفقیت ارسال شد");
      setReplyText("");
      router.refresh();
    } else {
      setError("خطا در ارسال پاسخ");
    }
    
    setSending(false);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">پاسخ به پیام</h3>
      
      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-3 mb-4 text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          پاسخ به: {userName} ({userEmail})
        </label>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
          placeholder="متن پاسخ خود را بنویسید..."
        />
      </div>
      
      <button
        onClick={handleSendReply}
        disabled={sending}
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
      >
        {sending ? "در حال ارسال..." : "ارسال پاسخ"}
      </button>
      
      <p className="text-gray-500 text-xs text-center mt-4">
        توجه: این پیام به ایمیل کاربر ارسال خواهد شد
      </p>
    </div>
  );
}