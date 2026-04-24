// Server Component - بدون "use client"
import Image from "next/image";
import Link from "next/link";

// تایپ دسته‌بندی بر اساس API
interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  imageUrl: string;
  coverImage: string;
  order: number;
  isActive: boolean;
  courseCount: number;
  totalStudents: number;
  averageRating: number;
  seoTitle: string;
  seoDescription: string;
  popularTags: string[];
  featuredInstructors: string[];
  createdAt: string;
}

async function getCategories(): Promise<Category[]> {
  // دریافت دسته‌بندی‌ها از API
  const res = await fetch("http://localhost:3000/courseCategories", {
    next: {
      revalidate: 3600 // بازسازی هر یک ساعت
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت دسته‌بندی‌ها");
  }
  
  const categories: Category[] = await res.json();
  
  // فیلتر دسته‌بندی‌های فعال و مرتب‌سازی بر اساس ترتیب
  return categories
    .filter(cat => cat.isActive === true)
    .sort((a, b) => a.order - b.order);
}

export default async function CourseCategories() {
  let categories: Category[] = [];
  let error: string | null = null;
  
  try {
    categories = await getCategories();
  } catch (err) {
    error = "خطا در بارگذاری دسته‌بندی‌ها. لطفاً مجدداً تلاش کنید.";
    console.error(err);
  }
  
  if (error) {
    return (
      <section className="relative w-full py-16 md:py-24" dir="rtl">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="text-red-400">
            <p className="text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  
  if (categories.length === 0) {
    return (
      <section className="relative w-full py-16 md:py-24" dir="rtl">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="text-gray-400">
            <p className="text-lg">در حال حاضر دسته‌بندی‌ای موجود نیست.</p>
          </div>
        </div>
      </section>
    );
  }
  
  const totalCourses = categories.reduce((acc, cat) => acc + cat.courseCount, 0);
  const totalStudents = categories.reduce((acc, cat) => acc + cat.totalStudents, 0);
  
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-28 overflow-hidden" dir="rtl">
      {/* تصویر پس‌زمینه با لایه سیاه */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://boom-zrbn.mohtava.cloud/thumbs/api/v1/image/1eb76882-8ebb-3522-9b9c-95555ad0e47a?zb_svc=fajr-im-prod&zb_dmn=ipm&zb_type=internal&zb_pl=0&zb_referer=zarebin.ir')" }}
      >
        {/* لایه سیاه با شفافیت ۷۵٪ */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>
      
      {/* محتوا */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر بخش */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            دسته‌بندی دوره‌های شطرنج
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            {totalCourses.toLocaleString("fa-IR")} دوره آموزشی در {categories.length} دسته‌بندی تخصصی
          </p>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            بیش از {totalStudents.toLocaleString("fa-IR")} دانشجو در سراسر ایران
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* شبکه دسته‌بندی‌ها - ۴ ستون در دسکتاپ، ۲ ستون در موبایل */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/courses?category=${category.slug}`}
              className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {/* تصویر دسته‌بندی */}
              <div className="relative h-32 md:h-40 overflow-hidden">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              </div>
              
              {/* محتوا */}
              <div className="p-4 md:p-5">
                {/* آیکون */}
                <div className="mb-3 text-3xl md:text-4xl" aria-hidden="true">
                  {category.icon}
                </div>
                
                {/* عنوان */}
                <h2 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {category.name}
                </h2>
                
                {/* توضیحات کوتاه */}
                <p className="text-gray-400 text-sm md:text-base line-clamp-2 mb-3">
                  {category.shortDescription}
                </p>
                
                {/* آمار */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex flex-col gap-1">
                    <span>{category.courseCount.toLocaleString("fa-IR")} دوره</span>
                    <span>{category.totalStudents.toLocaleString("fa-IR")} دانشجو</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span>{category.averageRating}</span>
                    </div>
                    <span className="text-amber-500 group-hover:-translate-x-1 transition-transform mt-2" aria-hidden="true">
                      ←
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* دکمه مشاهده همه */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>مشاهده همه دوره‌ها</span>
            <span aria-hidden="true">←</span>
          </Link>
        </div>
        
        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "دسته‌بندی دوره‌های شطرنج",
              "description": "مرور دسته‌بندی‌های جامع دوره‌های شطرنج",
              "numberOfItems": categories.length,
              "inLanguage": "fa-IR",
              "itemListElement": categories.map((category, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": category.name,
                "description": category.description,
                "url": `https://yourdomain.com/courses?category=${category.slug}`
              }))
            })
          }}
        />
      </div>
    </section>
  );
}