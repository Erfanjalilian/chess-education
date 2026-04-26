"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    categorySlug: "",
    tags: "",
    readingTime: 5,
    status: "draft",
    isFeatured: false,
  });

  const generateSlug = (title: string) => {
    return title
      .replace(/[^\w\u0600-\u06FF\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (name === "title" && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      author: {
        id: "1",
        name: "امیرحسین قاسمی",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        role: "مدیر سایت",
      },
      viewCount: 0,
      likes: 0,
      commentsCount: 0,
      publishedAt: formData.status === "published" ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const res = await fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
    
    if (res.ok) {
      router.push("/admin/blogs");
      router.refresh();
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blogs" className="text-gray-400 hover:text-white">
            ← بازگشت
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">ایجاد مقاله جدید</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* عنوان */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">عنوان مقاله *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          
          {/* اسلاگ */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">اسلاگ (آدرس)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          
          {/* خلاصه */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">خلاصه مقاله</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          
          {/* محتوا */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">محتوا (HTML)</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 font-mono text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* تصویر */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">آدرس تصویر</label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            
            {/* دسته‌بندی */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">دسته‌بندی</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            
            {/* برچسب‌ها */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">برچسب‌ها (با کاما جدا کنید)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="تاکتیک, آموزش, شطرنج"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            
            {/* زمان مطالعه */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">زمان مطالعه (دقیقه)</label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              مقاله ویژه
            </label>
            
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="status"
                checked={formData.status === "published"}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  status: e.target.checked ? "published" : "draft"
                }))}
                className="w-4 h-4"
              />
              منتشر شود
            </label>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "در حال ذخیره..." : "ذخیره مقاله"}
            </button>
            <Link
              href="/admin/blogs"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              انصراف
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}