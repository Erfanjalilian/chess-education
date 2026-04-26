"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteMessageButtonProps {
  messageId: string;
  messageName: string;
}

export default function DeleteMessageButton({ messageId, messageName }: DeleteMessageButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    
    const res = await fetch(`http://localhost:3000/contactMessages/${messageId}`, {
      method: "DELETE",
    });
    
    if (res.ok) {
      router.refresh();
      setIsOpen(false);
    }
    
    setIsDeleting(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-red-500 hover:text-red-400 transition-colors"
        title="حذف"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md mx-4 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">حذف پیام</h3>
            <p className="text-gray-300 mb-6">
              آیا از حذف پیام <span className="text-amber-500">"{messageName}"</span> اطمینان دارید؟
              این عمل غیرقابل بازگشت است.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? "در حال حذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}