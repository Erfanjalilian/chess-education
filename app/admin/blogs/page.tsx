// Server Component - بدون "use client"
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteBlogButton from "@/app/components/admin/DeleteBlogButton";
import ToggleFeaturedButton from "@/app/components/admin/ToggleFeaturedButton";
import ToggleStatusButton from "@/app/components/admin/ToggleStatusButton";

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
  const res = await fetch("http://localhost:3000/blogs", {
    next: {
      revalidate: 60 // هر ۶۰ ثانیه یکبار بازسازی برای admin
    },
    cache: 'no-store' // برای admin همیشه داده‌های تازه بگیر
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت مقالات");
  }
  
  return res.json();
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

export default async function AdminBlogsPage() {
  let blogs: Blog[] = [];
  let error: string | null = null;
  
  try {
    blogs = await getAllBlogs();
    // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
    blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
  
  const publishedCount = blogs.filter(b => b.status === "published").length;
  const draftCount = blogs.filter(b => b.status === "draft").length;
  const featuredCount = blogs.filter(b => b.isFeatured).length;
  const totalViews = blogs.reduce((sum, b) => sum + b.viewCount, 0);
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              مدیریت وبلاگ
            </h1>
            <p className="text-gray-400 text-sm">
              مدیریت مقالات، ویرایش، حذف و افزودن مقاله جدید
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            مقاله جدید
          </Link>
        </div>
        
        {/* آمار سریع */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">کل مقالات</p>
            <p className="text-2xl font-bold text-white">{blogs.length}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">منتشر شده</p>
            <p className="text-2xl font-bold text-green-500">{publishedCount}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">پیش‌نویس</p>
            <p className="text-2xl font-bold text-yellow-500">{draftCount}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">کل بازدیدها</p>
            <p className="text-2xl font-bold text-amber-500">{formatViews(totalViews)}</p>
          </div>
        </div>
        
        {/* جدول مقالات */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">مقاله</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">دسته‌بندی</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">وضعیت</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">بازدید</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">تاریخ</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-300">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {blog.author.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs text-amber-500 bg-amber-500/10 rounded-lg">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-lg w-20 text-center ${
                          blog.status === "published" 
                            ? "text-green-500 bg-green-500/10" 
                            : "text-yellow-500 bg-yellow-500/10"
                        }`}>
                          {blog.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                        </span>
                        {blog.isFeatured && (
                          <span className="inline-block px-2 py-1 text-xs text-amber-500 bg-amber-500/10 rounded-lg">
                            ویژه
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {blog.viewCount.toLocaleString("fa-IR")}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
                          title="ویرایش"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-gray-400 transition-colors"
                          title="مشاهده در سایت"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <ToggleFeaturedButton blogId={blog.id} isFeatured={blog.isFeatured} />
                        <ToggleStatusButton blogId={blog.id} currentStatus={blog.status} />
                        <DeleteBlogButton blogId={blog.id} blogTitle={blog.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* اگر مقاله‌ای وجود نداشت */}
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">هیچ مقاله‌ای یافت نشد.</p>
              <Link
                href="/admin/blogs/new"
                className="inline-block mt-4 text-amber-500 hover:text-amber-400"
              >
                اولین مقاله خود را ایجاد کنید
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}