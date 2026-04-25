// Server Component
import Link from "next/link";

export default function InstructorLoginPage() {
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700 text-center">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">ورود مربیان</h1>
            <p className="text-gray-400 mb-6">
              در حال حاضر بخش مربیان در دست ساخت است. به زودی امکان ثبت‌نام و ورود برای اساتید محترم فراهم خواهد شد.
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