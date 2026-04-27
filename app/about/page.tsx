// Server Component - بدون "use client"
import Image from "next/image";
import Link from "next/link";

// تایپ آمارها
interface AboutStat {
  id: string;
  value: string;
  valueRaw: number;
  label: string;
  labelEn: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

// تایپ ارزش‌ها
interface AboutValue {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

// تایپ اعضای تیم
interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  bio: string;
  bioEn: string;
  avatar: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  displayOrder: number;
  isActive: boolean;
}

// تایپ داستان
interface AboutStory {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  coverImage: string;
  coverImageEn?: string;
  updatedAt: string;
}

// تایپ تنظیمات
interface AboutSettings {
  id: string;
  siteName: string;
  siteNameEn: string;
  foundingYear: number;
  foundingLocation: string;
  numberOfEmployees: number;
  areaServed: string;
  languages: string[];
  description: string;
  descriptionEn: string;
  logo: string;
  website: string;
}

// دریافت آمارها
async function getAboutStats(): Promise<AboutStat[]> {
  const res = await fetch("http://localhost:3000/aboutStats", {
    next: {
      revalidate: 3600 // بازسازی هر یک ساعت
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت آمار");
  }
  
  const data: AboutStat[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت ارزش‌ها
async function getAboutValues(): Promise<AboutValue[]> {
  const res = await fetch("http://localhost:3000/aboutValues", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت ارزش‌ها");
  }
  
  const data: AboutValue[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت اعضای تیم
async function getAboutTeam(): Promise<TeamMember[]> {
  const res = await fetch("http://localhost:3000/aboutTeam", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت اعضای تیم");
  }
  
  const data: TeamMember[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت داستان
async function getAboutStory(): Promise<AboutStory | null> {
  const res = await fetch("http://localhost:3000/aboutStory", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    return null;
  }
  
  const data: AboutStory[] = await res.json();
  return data[0] || null;
}

// دریافت تنظیمات
async function getAboutSettings(): Promise<AboutSettings | null> {
  const res = await fetch("http://localhost:3000/aboutSettings", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    return null;
  }
  
  const data: AboutSettings[] = await res.json();
  return data[0] || null;
}

// آیکون‌های SVG بر اساس نوع
function getStatIcon(iconName: string) {
  switch (iconName) {
    case 'students':
      return (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'courses':
      return (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'instructors':
      return (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'visitors':
      return (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
    default:
      return (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

export default async function AboutPage() {
  const [stats, values, team, story, settings] = await Promise.all([
    getAboutStats(),
    getAboutValues(),
    getAboutTeam(),
    getAboutStory(),
    getAboutSettings()
  ]);
  
  const siteName = settings?.siteName || "ChessHub";
  
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            درباره ما
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            آشنایی با {siteName}، بزرگترین پلتفرم آموزش آنلاین شطرنج در ایران
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* بخش داستان ما - داینامیک */}
        {story && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {story.title}
              </h2>
              <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
              <div 
                className="text-gray-300 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            </div>
            <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        )}

        {/* آمار - داینامیک */}
        {stats.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                افتخارات ما در یک نگاه
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex justify-center mb-4">{getStatIcon(stat.icon)}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ارزش‌های ما - داینامیک */}
        {values.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                ارزش‌های ما
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                اصولی که همواره در {siteName} به آنها پایبند بوده‌ایم
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {values.map((value) => (
                <div
                  key={value.id}
                  className="bg-gray-900 rounded-xl p-6 text-center border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تیم ما - داینامیک */}
        {team.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                تیم ما
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                متخصصانی که پشت صحنه {siteName} فعالیت می‌کنند
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {team.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-500">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* دعوت به همکاری */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 md:p-12 text-center border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            به خانواده {siteName} بپیوندید
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

        {/* JSON-LD برای سئو - داینامیک */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": `درباره ما | ${siteName}`,
              "description": settings?.description || "آشنایی با ChessHub، بزرگترین پلتفرم آموزش آنلاین شطرنج در ایران",
              "mainEntity": {
                "@type": "Organization",
                "name": siteName,
                "url": settings?.website || "https://chesshub.com",
                "logo": settings?.logo || "https://chesshub.com/logo.png",
                "foundingDate": settings?.foundingYear?.toString() || "2021",
                "foundingLocation": settings?.foundingLocation || "Tehran, Iran",
                "numberOfEmployees": settings?.numberOfEmployees || 15,
                "areaServed": settings?.areaServed || "Iran",
                "knowsLanguage": settings?.languages || ["Persian"],
                "description": settings?.description || "پلتفرم آموزش آنلاین شطرنج با بیش از ۵۰ دوره تخصصی و همکاری با برترین اساتید ایران"
              }
            })
          }}
        />
      </div>
    </div>
  );
}