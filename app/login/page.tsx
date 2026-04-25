// Server Component - بدون "use client"
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            ورود به حساب کاربری
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            برای ادامه، نقش خود را در ChessHub انتخاب کنید
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* انتخاب نقش کاربری */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* کارت مربی شطرنج */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border-2 border-gray-700 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group">
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">مربی شطرنج</h2>
                  <p className="text-gray-400 text-sm">
                    فروش دوره‌های آموزشی خود را شروع کنید
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>ایجاد و مدیریت دوره‌های آموزشی</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>دریافت ۹۰٪ از درآمد فروش دوره‌ها</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>داشبورد تحلیلی پیشرفته</span>
                  </div>
                </div>
                
                <Link
                  href="/login/instructor"
                  className="block w-full text-center bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  ورود به پنل مربیان
                </Link>
              </div>
            </div>

            {/* کارت کاربر عادی */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border-2 border-gray-700 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group">
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">کاربر عادی</h2>
                  <p className="text-gray-400 text-sm">
                    دسترسی به دوره‌های آموزشی و محتوای سایت
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>خرید دوره‌های آموزشی متنوع</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>دسترسی به مقالات و مطالب آموزشی</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>پیگیری پیشرفت یادگیری</span>
                  </div>
                </div>
                
                <Link
                  href="/login/user"
                  className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  ورود به حساب کاربری
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* فرم ورود (استاتیک) */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white text-center mb-6">
              فرم ورود به سایت
            </h3>
            
            <form className="space-y-5">
              {/* ایمیل یا شماره تماس */}
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  ایمیل یا شماره تماس *
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="example@domain.com یا ۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>

              {/* رمز عبور */}
              <div>
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                  رمز عبور *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="********"
                />
              </div>

              {/* گزینه‌های اضافی */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input type="checkbox" className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-amber-500" />
                  <span>مرا به خاطر بسپار</span>
                </label>
                <Link href="/forgot-password" className="text-amber-500 hover:text-amber-400 transition-colors">
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>

              {/* دکمه ورود */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                ورود به سایت
              </button>

              {/* لینک ثبت‌نام */}
              <div className="text-center pt-2">
                <p className="text-gray-400 text-sm">
                  حساب کاربری ندارید؟{" "}
                  <Link href="/register" className="text-amber-500 hover:text-amber-400 font-semibold">
                    ثبت‌نام کنید
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "ورود به ChessHub",
              "description": "ورود به پلتفرم آموزش شطرنج ChessHub - انتخاب نقش مربی یا کاربر عادی",
              "inLanguage": "fa-IR",
              "significantLink": [
                "https://chesshub.com/login/instructor",
                "https://chesshub.com/login/user"
              ]
            })
          }}
        />
      </div>
    </div>
  );
}