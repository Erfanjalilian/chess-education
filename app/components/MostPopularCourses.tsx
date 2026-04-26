// Server Component - بدون "use client"
import Image from "next/image";
import Link from "next/link";

// تایپ دوره بر اساس ساختار API شما
interface Course {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  shortDescription: string;
  price: number;
  instructorId: string;
  categoryId: string;
  categoryName: string;
  level: string;
  levelEn: string;
  duration: string;
  durationMinutes: number;
  imageUrl: string;
  trailerUrl: string;
  visitorsCount: number;
  averageRating: number;
  lessonsCount: number;
  videoContent: {
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
      videoUrl: string;
      thumbnail: string;
      isPreview: boolean;
    }>;
  };
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  createdAt: string;
}

async function getMostPopularCourses(): Promise<Course[]> {
  // دریافت دوره‌ها از API
  const res = await fetch("http://localhost:3000/courses", {
    next: {
      revalidate: 3600 // بازسازی هر یک ساعت (ISR)
    },
    cache: 'force-cache' // کش کردن برای عملکرد بهتر
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت دوره‌ها");
  }
  
  const courses: Course[] = await res.json();
  
  // مرتب‌سازی بر اساس تعداد بازدید (بیشترین بازدید اول) و گرفتن 6 دوره اول
  return courses
    .sort((a, b) => b.visitorsCount - a.visitorsCount)
    .slice(0, 6);
}

// فرمت کردن قیمت به تومان
function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

// فرمت کردن تعداد بازدید
function formatViews(views: number): string {
  if (views >= 1000000) {
  } else if (views >= 1000) {
  }
  return views.toLocaleString("fa-IR");
}

export default async function MostPopularCourses() {
  let courses: Course[] = [];
  let error: string | null = null;
  
  try {
    courses = await getMostPopularCourses();
  } catch (err) {
    error = "خطا در بارگذاری دوره‌های محبوب. لطفاً مجدداً تلاش کنید.";
    console.error(err);
  }
  
  if (error) {
    return (
      <section className="w-full py-12 md:py-16 lg:py-20 bg-black" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            <p className="text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  
  if (courses.length === 0) {
    return (
      <section className="w-full py-12 md:py-16 lg:py-20 bg-black" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="text-lg">در حال حاضر دوره‌ای موجود نیست.</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-black" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر بخش */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            محبوب‌ترین دوره‌ها
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            دوره‌هایی که بیشترین استقبال را از سوی شطرنج‌بازان داشته‌اند
          </p>
          <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* دوره‌ها با اسکرول افقی */}
        <div className="relative">
          {/* محفظه اسکرول */}
          <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-amber-500">
            <div className="flex gap-5 md:gap-6" style={{ minWidth: "min-content" }}>
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}`}
                  className="group block w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] flex-shrink-0"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-amber-500/50 h-full">
                    {/* تصویر دوره */}
                    <div className="relative h-48 md:h-52 lg:h-56 overflow-hidden">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, (max-width: 1024px) 320px, 350px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                      
                      {/* نشان سطح دوره */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-amber-500/90 rounded-lg backdrop-blur-sm">
                          {course.level}
                        </span>
                      </div>
                      
                      {/* نشان تعداد بازدید */}
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-black/60 rounded-lg backdrop-blur-sm">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>{formatViews(course.visitorsCount)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* محتوای دوره */}
                    <div className="p-4">
                      {/* دسته‌بندی */}
                      <div className="mb-2">
                        <span className="text-xs text-amber-500">{course.categoryName}</span>
                      </div>
                      
                      {/* عنوان */}
                      <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                        {course.title}
                      </h3>
                      
                      {/* توضیحات کوتاه */}
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {course.shortDescription}
                      </p>
                      
                      {/* رتبه و مدت زمان */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500">★</span>
                          <span>{course.averageRating}</span>
                          <span className="mx-1">•</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{course.lessonsCount} درس</span>
                        </div>
                      </div>
                      
                      {/* قیمت */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                        <span className="text-lg font-bold text-amber-500">
                          {formatPrice(course.price)}
                        </span>
                        <span className="text-amber-500 group-hover:-translate-x-1 transition-transform" aria-hidden="true">
                          ←
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* سایه‌های انتهایی برای نشان دادن اسکرول در موبایل */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none md:hidden"></div>
        </div>
        
        {/* راهنمای اسکرول برای موبایل */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>برای مشاهده بیشتر به چپ و راست اسکرول کنید</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        
        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "محبوب‌ترین دوره‌های شطرنج",
              "description": "دوره‌های پرفروش و محبوب آموزش شطرنج",
              "numberOfItems": courses.length,
              "inLanguage": "fa-IR",
              "itemListElement": courses.map((course, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Course",
                  "name": course.title,
                  "description": course.shortDescription,
                  "provider": {
                    "@type": "Organization",
                    "name": "ChessHub"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": course.price,
                    "priceCurrency": "IRR"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": course.averageRating,
                    "ratingCount": course.visitorsCount
                  }
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}