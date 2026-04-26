// Server Component - بدون "use client"
import { notFound } from "next/navigation";
import Link from "next/link";
import ReplyToMessage from "@/app/components/admin/ReplyToMessage";
import MarkAsRepliedButton from "@/app/components/admin/MarkAsRepliedButton";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  subjectLabel: string;
  message: string;
  status: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
  updatedAt: string | null;
}

async function getMessageById(id: string): Promise<ContactMessage | null> {
  const res = await fetch(`http://localhost:3000/contactMessages/${id}`, {
    next: { revalidate: 10 },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

async function markAsRead(id: string) {
  'use server';
  
  await fetch(`http://localhost:3000/contactMessages/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      isRead: true,
      status: 'read',
      updatedAt: new Date().toISOString()
    })
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContactMessageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const message = await getMessageById(id);
  
  if (!message) {
    notFound();
  }
  
  // علامت‌گذاری به عنوان خوانده شده
  if (!message.isRead) {
    await markAsRead(id);
  }
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* دکمه بازگشت */}
        <div className="mb-6">
          <Link href="/admin/contact" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            بازگشت به لیست پیام‌ها
          </Link>
        </div>
        
        {/* جزئیات پیام */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold text-white">جزئیات پیام</h1>
              <MarkAsRepliedButton messageId={message.id} isReplied={message.isReplied} />
            </div>
            
            {/* اطلاعات فرستنده */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-700">
              <div>
                <p className="text-gray-400 text-sm mb-1">نام و نام خانوادگی</p>
                <p className="text-white font-medium">{message.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">آدرس ایمیل</p>
                <p className="text-white font-medium">{message.email}</p>
              </div>
              {message.phone && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">شماره تماس</p>
                  <p className="text-white font-medium dir-ltr text-left">{message.phone}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-sm mb-1">موضوع</p>
                <p className="inline-block px-2 py-1 text-xs text-amber-500 bg-amber-500/10 rounded-lg">
                  {message.subjectLabel}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">تاریخ ارسال</p>
                <p className="text-white font-medium">{formatDate(message.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">وضعیت</p>
                <p className="text-white font-medium">
                  {message.isReplied ? 'پاسخ داده شده' : message.isRead ? 'خوانده شده' : 'خوانده نشده'}
                </p>
              </div>
            </div>
            
            {/* متن پیام */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-2">متن پیام</p>
              <div className="bg-gray-800/50 rounded-lg p-4 whitespace-pre-wrap text-gray-300 leading-relaxed">
                {message.message}
              </div>
            </div>
            
            {/* فرم پاسخ */}
            <ReplyToMessage 
              messageId={message.id} 
              userEmail={message.email} 
              userName={message.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}