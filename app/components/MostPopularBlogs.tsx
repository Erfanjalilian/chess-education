// Server Component - بدون "use client"
import Image from "next/image";
import Link from "next/link";

// تایپ بلاگ بر اساس ساختار API
interface Blog {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  description: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  readingTime: number;
  viewCount: number;
  likes: number;
  commentsCount: number;
  isFeatured: boolean;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

async function getMostPopularBlogs(): Promise<Blog[]> {
  // دریافت مقالات از API
  const res = await fetch("http://localhost:3000/blogs", {
    next: {
      revalidate: 3600 // بازسازی هر یک ساعت (ISR)
    },
    cache: 'force-cache' // کش کردن برای عملکرد بهتر
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت مقالات");
  }
  
  const blogs: Blog[] = await res.json();
  
  // فیلتر مقالات منتشر شده، مرتب‌سازی بر اساس تعداد بازدید و گرفتن 6 مقاله اول
  return blogs
    .filter(blog => blog.status === "published")
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);
}

// فرمت کردن تعداد بازدید
function formatViews(views: number): string {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1).toLocaleString("fa-IR") + " میلیون";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(0).toLocaleString("fa-IR") + " هزار";
  }
  return views.toLocaleString("fa-IR");
}

// فرمت کردن تاریخ به فارسی
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function MostPopularBlogs() {
  let blogs: Blog[] = [];
  let error: string | null = null;
  
  try {
    blogs = await getMostPopularBlogs();
  } catch (err) {
    error = "خطا در بارگذاری مقالات محبوب. لطفاً مجدداً تلاش کنید.";
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
  
  if (blogs.length === 0) {
    return (
      <section className="w-full py-12 md:py-16 lg:py-20 bg-black" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="text-lg">در حال حاضر مقاله‌ای موجود نیست.</p>
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
            محبوب‌ترین مقالات
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            پرمخاطب‌ترین مطالب آموزشی و تحلیلی شطرنج
          </p>
          <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* مقالات با اسکرول افقی */}
        <div className="relative">
          {/* محفظه اسکرول */}
          <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-amber-500">
            <div className="flex gap-5 md:gap-6" style={{ minWidth: "min-content" }}>
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group block w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] flex-shrink-0"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-amber-500/50 h-full flex flex-col">
                    {/* تصویر مقاله */}
                    <div className="relative h-48 md:h-52 lg:h-56 overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, (max-width: 1024px) 320px, 350px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                      
                      {/* نشان دسته‌بندی */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-amber-500/90 rounded-lg backdrop-blur-sm">
                          {blog.category}
                        </span>
                      </div>
                      
                      {/* نشان تعداد بازدید */}
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-black/60 rounded-lg backdrop-blur-sm">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>{formatViews(blog.viewCount)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* محتوای مقاله */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* عنوان */}
                      <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                        {blog.title}
                      </h3>
                      
                      {/* خلاصه */}
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {blog.excerpt}
                      </p>
                      
                      {/* اطلاعات نویسنده و زمان مطالعه */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image
                              src={blog.author.avatar}
                              alt={blog.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{blog.readingTime} دقیقه</span>
                        </div>
                      </div>
                      
                      {/* تاریخ انتشار و لایک */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-700 mt-auto">
                        <span className="text-xs text-gray-500">
                          {formatDate(blog.publishedAt)}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>{blog.likes.toLocaleString("fa-IR")}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{blog.commentsCount.toLocaleString("fa-IR")}</span>
                          </div>
                        </div>
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
        
        {/* دکمه مشاهده همه مقالات */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-amber-500 text-amber-500 hover:text-black border border-amber-500 font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>مشاهده همه مقالات</span>
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
              "name": "محبوب‌ترین مقالات شطرنج",
              "description": "پرمخاطب‌ترین مقالات آموزشی و تحلیلی شطرنج",
              "numberOfItems": blogs.length,
              "inLanguage": "fa-IR",
              "itemListElement": blogs.map((blog, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Article",
                  "headline": blog.title,
                  "description": blog.excerpt,
                  "image": blog.coverImage,
                  "datePublished": blog.publishedAt,
                  "author": {
                    "@type": "Person",
                    "name": blog.author.name
                  },
                  "interactionStatistic": [
                    {
                      "@type": "InteractionCounter",
                      "interactionType": "https://schema.org/ViewAction",
                      "userInteractionCount": blog.viewCount
                    },
                    {
                      "@type": "InteractionCounter",
                      "interactionType": "https://schema.org/LikeAction",
                      "userInteractionCount": blog.likes
                    },
                    {
                      "@type": "InteractionCounter",
                      "interactionType": "https://schema.org/CommentAction",
                      "userInteractionCount": blog.commentsCount
                    }
                  ]
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}