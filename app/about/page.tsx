// Server Component - بدون "use client"
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    {
      value: "۱۵,۰۰۰+",
      label: "دانشجوی فعال",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      value: "۵۰+",
      label: "دوره تخصصی",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      value: "۱۰+",
      label: "مدرس مجرب",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      value: "۱۰۰,۰۰۰+",
      label: "بازدید ماهانه",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
  ];

  const values = [
    {
      title: "کیفیت برتر",
      description: "تمامی دوره‌ها توسط استادبزرگان و مربیان مجرب تولید می‌شوند",
      icon: "🎯",
    },
    {
      title: "دسترسی آسان",
      description: "یادگیری آنلاین در هر زمان و هر مکان با پشتیبانی کامل",
      icon: "🌐",
    },
    {
      title: "پشتیبانی حرفه‌ای",
      description: "تیم پشتیبانی ما ۷ روز هفته پاسخگوی سوالات شماست",
      icon: "💬",
    },
    {
      title: "به‌روزرسانی مداوم",
      description: "محتوای آموزشی بر اساس آخرین متدهای روز شطرنج به‌روز می‌شود",
      icon: "🔄",
    },
  ];

  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            درباره ما
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            آشنایی با ChessHub، بزرگترین پلتفرم آموزش آنلاین شطرنج در ایران
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* بخش داستان ما */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              داستان ChessHub
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
            <p className="text-gray-300 leading-relaxed">
              ChessHub در سال ۱۴۰۰ با هدف ارائه آموزش‌های باکیفیت و تخصصی شطرنج به زبان فارسی تأسیس شد. 
              ما معتقدیم که شطرنج فراتر از یک بازی، یک هنر و علم است که می‌تواند مهارت‌های تحلیلی، 
              خلاقیت و صبر را در افراد تقویت کند.
            </p>
            <p className="text-gray-300 leading-relaxed">
              امروز ChessHub به عنوان یکی از معتبرترین پلتفرم‌های آموزش آنلاین شطرنج در ایران شناخته می‌شود. 
              با بیش از ۵۰ دوره تخصصی و همکاری با برترین اساتید کشور، توانسته‌ایم میزبان هزاران 
              شطرنج‌باز مشتاق از سراسر ایران باشیم.
            </p>
            <p className="text-gray-300 leading-relaxed">
              رسالت ما ترویج فرهنگ شطرنج و ارائه آموزش‌های استاندارد و به‌روز به تمام علاقه‌مندان است، 
              از مبتدیانی که تازه قدم به دنیای شطرنج گذاشته‌اند تا بازیکنان حرفه‌ای که به دنبال ارتقای 
              سطح خود هستند.
            </p>
          </div>
          <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=800&h=600&fit=crop"
              alt="ChessHub About Us"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* آمار */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              افتخارات ما در یک نگاه
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ارزش‌های ما */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              ارزش‌های ما
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              اصولی که همواره در ChessHub به آنها پایبند بوده‌ایم
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-6 text-center border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* تیم ما */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              تیم ما
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              متخصصانی که پشت صحنه ChessHub فعالیت می‌کنند
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-500">
                  <Image
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 50}.jpg`}
                    alt="Team member"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-white font-bold">
                  {item === 1 && "امیرحسین قاسمی"}
                  {item === 2 && "سارا کریمی"}
                  {item === 3 && "محمد رضایی"}
                  {item === 4 && "زهرا حسینی"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item === 1 && "بنیان‌گذار"}
                  {item === 2 && "مدیر آموزشی"}
                  {item === 3 && "سرپرست تولید محتوا"}
                  {item === 4 && "مدیر پشتیبانی"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* دعوت به همکاری */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 md:p-12 text-center border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            به خانواده ChessHub بپیوندید
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            همین امروز سفر یادگیری خود را آغاز کنید و مهارت‌های شطرنج خود را به سطح بعدی ببرید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 md:px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              مشاهده دوره‌ها
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent hover:bg-amber-500 text-amber-500 hover:text-black border border-amber-500 font-bold px-6 md:px-8 py-3 rounded-lg transition-all duration-200"
            >
              تماس با ما
            </Link>
          </div>
        </div>

        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "درباره ما | ChessHub",
              "description": "آشنایی با ChessHub، بزرگترین پلتفرم آموزش آنلاین شطرنج در ایران",
              "mainEntity": {
                "@type": "Organization",
                "name": "ChessHub",
                "url": "https://chesshub.com",
                "logo": "https://chesshub.com/logo.png",
                "foundingDate": "2021",
                "foundingLocation": "Tehran, Iran",
                "numberOfEmployees": "15",
                "areaServed": "Iran",
                "knowsLanguage": ["Persian"],
                "description": "پلتفرم آموزش آنلاین شطرنج با بیش از ۵۰ دوره تخصصی و همکاری با برترین اساتید ایران"
              }
            })
          }}
        />
      </div>
    </div>
  );
}