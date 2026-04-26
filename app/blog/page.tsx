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

async function getAllBlogs(): Promise<Blog[]> {
  // دریافت تمام مقالات از API
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
  
  // فیلتر مقالات منتشر شده و مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
  return blogs
    .filter(blog => blog.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
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

// فرمت کردن تعداد بازدید
function formatViews(views: number): string {
  if (views >= 1000000) {
  } else if (views >= 1000) {
  }
  return views.toLocaleString("fa-IR");
}

export default async function BlogPage() {
  let blogs: Blog[] = [];
  let error: string | null = null;
  
  try {
    blogs = await getAllBlogs();
  } catch (err) {
    error = "خطا در بارگذاری مقالات. لطفاً مجدداً تلاش کنید.";
    console.error(err);
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            <p className="text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // جداسازی مقاله ویژه و مقالات عادی
  const featuredBlog = blogs.find(blog => blog.isFeatured === true);
  const regularBlogs = blogs.filter(blog => blog.isFeatured !== true);
  
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            وبلاگ ChessHub
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            آخرین مطالب آموزشی، تحلیلی و خبری دنیای شطرنج
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* مقاله ویژه (Featured) */}
        {featuredBlog && (
          <div className="mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="relative h-64 md:h-80 lg:h-full">
                  <Image
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-amber-500 rounded-lg">
                      مقاله ویژه
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <span className="text-amber-500">{featuredBlog.category}</span>
                    <span>•</span>
                    <span>{formatDate(featuredBlog.publishedAt)}</span>
                    <span>•</span>
                    <span>{featuredBlog.readingTime} دقیقه مطالعه</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 hover:text-amber-500 transition-colors">
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      {featuredBlog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg mb-4 line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={featuredBlog.author.avatar}
                          alt={featuredBlog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{featuredBlog.author.name}</p>
                        <p className="text-gray-500 text-xs">{featuredBlog.author.role}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold"
                    >
                      <span>ادامه مطلب</span>
                      <span>←</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* شبکه مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-amber-500/50 group"
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  
                  {/* دسته‌بندی */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-amber-500/90 rounded-lg backdrop-blur-sm">
                      {blog.category}
                    </span>
                  </div>
                  
                  {/* تعداد بازدید */}
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
                
                <div className="p-5">
                  {/* اطلاعات بالا */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{formatDate(blog.publishedAt)}</span>
                    <span>•</span>
                    <span>{blog.readingTime} دقیقه</span>
                  </div>
                  
                  {/* عنوان */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                    {blog.title}
                  </h3>
                  
                  {/* خلاصه */}
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>
                  
                  {/* نویسنده و آمار */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-gray-400 text-xs">{blog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{blog.likes.toLocaleString("fa-IR")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{blog.commentsCount.toLocaleString("fa-IR")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* اگر مقاله‌ای وجود نداشت */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">در حال حاضر مقاله‌ای منتشر نشده است.</p>
          </div>
        )}

        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "وبلاگ ChessHub",
              "description": "مقالات آموزشی و تحلیلی شطرنج",
              "url": "https://chesshub.com/blog",
              "inLanguage": "fa-IR",
              "blogPost": blogs.map((blog) => ({
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.excerpt,
                "image": blog.coverImage,
                "datePublished": blog.publishedAt,
                "dateModified": blog.updatedAt,
                "author": {
                  "@type": "Person",
                  "name": blog.author.name
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://chesshub.com/blog/${blog.slug}`
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
              }))
            })
          }}
        />
      </div>
    </div>
  );
}