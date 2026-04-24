// Server Component - بدون "use client"
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            تماس با ما
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            ما همیشه آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* سمت راست - اطلاعات تماس */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">اطلاعات تماس</h2>
              
              {/* شماره تماس */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">شماره تماس</p>
                  <p className="text-white text-lg font-semibold dir-ltr text-left">۰۹۲۱-۳۵۷-۰۳۸۹</p>
                </div>
              </div>

              {/* ایمیل */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">آدرس ایمیل</p>
                  <p className="text-white text-lg font-semibold">support@chesshub.com</p>
                </div>
              </div>

              {/* آدرس */}
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">آدرس دفتر مرکزی</p>
                  <p className="text-white text-base">تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳</p>
                </div>
              </div>
            </div>

            {/* ساعات کاری */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">ساعات کاری</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>شنبه تا چهارشنبه</span>
                  <span className="text-amber-500">۹:۰۰ - ۱۸:۰۰</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>پنجشنبه</span>
                  <span className="text-amber-500">۹:۰۰ - ۱۳:۰۰</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>جمعه</span>
                  <span className="text-gray-500">تعطیل</span>
                </div>
              </div>
            </div>
          </div>

          {/* سمت چپ - فرم تماس */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">ارسال پیام</h2>
            
            <form className="space-y-5">
              {/* نام و نام خانوادگی */}
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                  نام و نام خانوادگی *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                />
              </div>

              {/* آدرس ایمیل */}
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  آدرس ایمیل *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="example@domain.com"
                />
              </div>

              {/* شماره تماس (اختیاری) */}
              <div>
                <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                  شماره تماس (اختیاری)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>

              {/* موضوع */}
              <div>
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                  موضوع *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="support">پشتیبانی و مشکلات فنی</option>
                  <option value="sales">مشاوره خرید دوره</option>
                  <option value="partnership">همکاری و مشارکت</option>
                  <option value="suggestion">پیشنهادات و انتقادات</option>
                  <option value="other">سایر موارد</option>
                </select>
              </div>

              {/* پیام */}
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  پیام شما *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                  placeholder="پیام خود را بنویسید..."
                ></textarea>
              </div>

              {/* دکمه ارسال */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                ارسال پیام
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                * تمامی فیلدهای دارای ستاره اجباری هستند
              </p>
            </form>
          </div>
        </div>

        {/* نقشه (اختیاری) */}
        <div className="mt-12 md:mt-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 text-center">موقعیت ما روی نقشه</h3>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-800">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.389%2C35.689%2C51.409%2C35.699&layer=mapnik&marker=35.694%2C51.399"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="ChessHub Office Location"
              ></iframe>
            </div>
            <p className="text-gray-500 text-xs text-center mt-4">
              تهران، خیابان ولیعصر، بالاتر از میدان ونک
            </p>
          </div>
        </div>

        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "تماس با ما | ChessHub",
              "description": "ارتباط با تیم پشتیبانی ChessHub",
              "mainEntity": {
                "@type": "Organization",
                "name": "ChessHub",
                "url": "https://chesshub.com",
                "email": "support@chesshub.com",
                "telephone": "+989213570389",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Tehran",
                  "addressCountry": "IR"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+989213570389",
                  "contactType": "customer service",
                  "availableLanguage": ["Persian"]
                }
              }
            })
          }}
        />
      </div>
    </div>
  );
}