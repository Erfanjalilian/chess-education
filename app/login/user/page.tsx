// Server Component
import Link from "next/link";

export default function UserLoginPage() {
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700 text-center">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">ورود کاربران</h1>
            <p className="text-gray-400 mb-6">
              در حال حاضر بخش کاربران در دست ساخت است. به زودی امکان ثبت‌نام و ورود برای کاربران عزیز فراهم خواهد شد.
            </p>
            <Link
              href="/login"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-200"
            >
              بازگشت به صفحه ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}