// Server Component - بدون "use client"
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

// دریافت تمام اسلاگ‌ها برای تولید استاتیک (SSG)
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/blogs", {
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    return [];
  }
  
  const blogs: Blog[] = await res.json();
  
  return blogs
    .filter(blog => blog.status === "published")
    .map((blog) => ({
      slug: blog.slug,
    }));
}

// دریافت اطلاعات یک مقاله بر اساس اسلاگ
async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`http://localhost:3000/blogs?slug=${slug}`, {
    next: {
      revalidate: 3600 // بازسازی هر یک ساعت (ISR)
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    return null;
  }
  
  const blogs: Blog[] = await res.json();
  
  if (blogs.length === 0) {
    return null;
  }
  
  return blogs[0];
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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  // اگر مقاله وجود نداشت، صفحه 404 نمایش داده شود
  if (!blog) {
    notFound();
  }
  
  // مقالات مرتبط (بر اساس دسته‌بندی)
  const relatedBlogsRes = await fetch(`http://localhost:3000/blogs?category=${encodeURIComponent(blog.category)}&id_ne=${blog.id}&_limit=3`, {
    next: { revalidate: 3600 }
  });
  const relatedBlogs: Blog[] = await relatedBlogsRes.json();
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* مسیر راهنما (Breadcrumb) */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-amber-500 transition-colors">
            خانه
          </Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-amber-500 transition-colors">
            وبلاگ
          </Link>
          <span>›</span>
          <span className="text-gray-400">{blog.title}</span>
        </div>

        {/* مقاله اصلی */}
        <article className="max-w-4xl mx-auto">
          
          {/* هدر مقاله */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link 
                href={`/blog?category=${blog.categorySlug}`}
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                {blog.category}
              </Link>
              <span>•</span>
              <span>{formatDate(blog.publishedAt)}</span>
              <span>•</span>
              <span>{blog.readingTime} دقیقه مطالعه</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {blog.title}
            </h1>
            
            {/* نویسنده */}
            <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-y border-gray-800">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">{blog.author.name}</p>
                  <p className="text-gray-500 text-sm">{blog.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>{formatViews(blog.viewCount)} بازدید</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{blog.likes.toLocaleString("fa-IR")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{blog.commentsCount.toLocaleString("fa-IR")}</span>
                </div>
              </div>
            </div>
          </header>

          {/* تصویر شاخص */}
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-8 md:mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* محتوای مقاله */}
          <div 
            className="prose prose-invert prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* برچسب‌ها */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-800 mb-12">
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm text-gray-400 bg-gray-800 rounded-full hover:bg-amber-500 hover:text-black transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* دکمه‌های اشتراک‌گذاری */}
          <div className="flex items-center justify-center gap-4 py-8 border-y border-gray-800 mb-12">
            <span className="text-gray-400">اشتراک‌گذاری:</span>
            <button className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4.5v12a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 16.5v-12A1.5 1.5 0 013.5 3h17A1.5 1.5 0 0122 4.5zM7 8l5 4 5-4" />
              </svg>
            </button>
            <button className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8.5L12 14l9-5.5M12 22v-8" />
              </svg>
            </button>
          </div>

          {/* مقالات مرتبط */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">مقالات مرتبط</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group block bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-amber-500/50"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedBlog.coverImage}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-bold line-clamp-2 group-hover:text-amber-500 transition-colors">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-2">
                        {formatDate(relatedBlog.publishedAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blog.title,
              "alternativeHeadline": blog.titleEn,
              "description": blog.excerpt,
              "image": blog.coverImage,
              "datePublished": blog.publishedAt,
              "dateModified": blog.updatedAt,
              "author": {
                "@type": "Person",
                "name": blog.author.name,
                "url": `https://chesshub.com/author/${blog.author.id}`
              },
              "publisher": {
                "@type": "Organization",
                "name": "ChessHub",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://chesshub.com/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://chesshub.com/blog/${blog.slug}`
              },
              "keywords": blog.tags.join(", "),
              "articleSection": blog.category,
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
            })
          }}
        />
      </div>
    </div>
  );
}