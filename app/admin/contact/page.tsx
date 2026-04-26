// Server Component - بدون "use client"
import Link from "next/link";
import DeleteMessageButton from "@/app/components/admin/DeleteMessageButton";
import ToggleMessageStatusButton from "@/app/components/admin/ToggleMessageStatusButton";

// تایپ پیام‌های تماس
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

// تایپ اطلاعات تماس
interface ContactInfo {
  id: string;
  type: string;
  value: string;
  label: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

// تایپ ساعات کاری
interface WorkingHour {
  id: string;
  day: string;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
  displayOrder: number;
}

// تایپ لینک‌های اجتماعی
interface SocialLink {
  id: string;
  platform: string;
  name: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
}

// دریافت تمام پیام‌ها
async function getContactMessages(): Promise<ContactMessage[]> {
  const res = await fetch("http://localhost:3000/contactMessages", {
    next: {
      revalidate: 10 // هر ۱۰ ثانیه یکبار برای admin
    },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت پیام‌ها");
  }
  
  const data: ContactMessage[] = await res.json();
  return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// دریافت اطلاعات تماس
async function getContactInfo(): Promise<ContactInfo[]> {
  const res = await fetch("http://localhost:3000/contactInfo", {
    next: { revalidate: 60 },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات تماس");
  }
  
  const data: ContactInfo[] = await res.json();
  return data.sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت ساعات کاری
async function getWorkingHours(): Promise<WorkingHour[]> {
  const res = await fetch("http://localhost:3000/workingHours", {
    next: { revalidate: 60 },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت ساعات کاری");
  }
  
  const data: WorkingHour[] = await res.json();
  return data.sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت لینک‌های اجتماعی
async function getSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch("http://localhost:3000/socialLinks", {
    next: { revalidate: 60 },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت لینک‌های اجتماعی");
  }
  
  const data: SocialLink[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// فرمت کردن تاریخ به فارسی
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

// دریافت وضعیت به فارسی
function getStatusBadge(status: string, isRead: boolean, isReplied: boolean) {
  if (isReplied) {
    return <span className="inline-block px-2 py-1 text-xs text-green-500 bg-green-500/10 rounded-lg">پاسخ داده شده</span>;
  }
  if (isRead) {
    return <span className="inline-block px-2 py-1 text-xs text-blue-500 bg-blue-500/10 rounded-lg">خوانده شده</span>;
  }
  return <span className="inline-block px-2 py-1 text-xs text-yellow-500 bg-yellow-500/10 rounded-lg">خوانده نشده</span>;
}

export default async function AdminContactPage() {
  const [messages, contactInfo, workingHours, socialLinks] = await Promise.all([
    getContactMessages(),
    getContactInfo(),
    getWorkingHours(),
    getSocialLinks()
  ]);
  
  const unreadCount = messages.filter(m => !m.isRead).length;
  const repliedCount = messages.filter(m => m.isReplied).length;
  const totalMessages = messages.length;
  
  // جدا کردن اطلاعات تماس بر اساس نوع
  const phoneInfo = contactInfo.find(item => item.type === 'phone');
  const emailInfo = contactInfo.find(item => item.type === 'email');
  const addressInfo = contactInfo.find(item => item.type === 'address');
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            مدیریت پیام‌های تماس
          </h1>
          <p className="text-gray-400 text-sm">
            مشاهده، پاسخگویی و مدیریت پیام‌های دریافتی از کاربران
          </p>
        </div>
        
        {/* آمار سریع */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">کل پیام‌ها</p>
            <p className="text-2xl font-bold text-white">{totalMessages}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">خوانده نشده</p>
            <p className="text-2xl font-bold text-yellow-500">{unreadCount}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">پاسخ داده شده</p>
            <p className="text-2xl font-bold text-green-500">{repliedCount}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">نیاز به پاسخ</p>
            <p className="text-2xl font-bold text-amber-500">{messages.filter(m => m.isRead && !m.isReplied).length}</p>
          </div>
        </div>
        
        {/* تب‌های مدیریت */}
        <div className="mb-8 border-b border-gray-800">
          <div className="flex gap-6">
            <Link href="/admin/contact" className="pb-3 text-amber-500 border-b-2 border-amber-500 font-medium">
              پیام‌ها
            </Link>
            <Link href="/admin/contact/settings" className="pb-3 text-gray-400 hover:text-white transition-colors">
              تنظیمات تماس
            </Link>
          </div>
        </div>
        
        {/* لیست پیام‌ها */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">فرستنده</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">موضوع</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">پیام</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">وضعیت</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">تاریخ</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-300">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium text-sm">{message.name}</p>
                        <p className="text-gray-500 text-xs">{message.email}</p>
                        {message.phone && (
                          <p className="text-gray-500 text-xs dir-ltr text-left">{message.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs text-amber-500 bg-amber-500/10 rounded-lg">
                        {message.subjectLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-300 text-sm line-clamp-2 max-w-xs">
                        {message.message}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(message.status, message.isRead, message.isReplied)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {formatDate(message.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/contact/${message.id}`}
                          className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
                          title="مشاهده و پاسخ"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <ToggleMessageStatusButton 
                          messageId={message.id} 
                          isRead={message.isRead}
                          isReplied={message.isReplied}
                        />
                        <DeleteMessageButton messageId={message.id} messageName={message.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* اگر پیامی وجود نداشت */}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">هیچ پیامی یافت نشد.</p>
            </div>
          )}
        </div>
        
        {/* اطلاعات تماس خلاصه */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">شماره تماس</h3>
            <p className="text-amber-500 text-lg font-bold dir-ltr text-left">{phoneInfo?.value || "تنظیم نشده"}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">ایمیل</h3>
            <p className="text-amber-500 text-lg font-bold">{emailInfo?.value || "تنظیم نشده"}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">ساعات کاری</h3>
            <p className="text-amber-500 text-sm">
              {workingHours.filter(h => h.isOpen).length} روز فعال در هفته
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}