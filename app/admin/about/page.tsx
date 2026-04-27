// Server Component - بدون "use client"
import Link from "next/link";
import Image from "next/image";
import EditStatButton from "@/app/components/admin/about/EditStatButton";
import DeleteStatButton from "@/app/components/admin/about/DeleteStatButton";
import EditValueButton from "@/app/components/admin/about/EditValueButton";
import DeleteValueButton from "@/app/components/admin/about/DeleteValueButton";
import EditTeamButton from "@/app/components/admin/about/EditTeamButton";
import DeleteTeamButton from "@/app/components/admin/about/DeleteTeamButton";
import ToggleActiveButton from "@/app/components/admin/about/ToggleActiveButton";

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
  createdAt: string;
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
  createdAt: string;
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
  createdAt: string;
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
    next: { revalidate: 10 },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت آمار");
  }
  
  const data: AboutStat[] = await res.json();
  return data.sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت ارزش‌ها
async function getAboutValues(): Promise<AboutValue[]> {
  const res = await fetch("http://localhost:3000/aboutValues", {
    next: { revalidate: 10 },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت ارزش‌ها");
  }
  
  const data: AboutValue[] = await res.json();
  return data.sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت اعضای تیم
async function getAboutTeam(): Promise<TeamMember[]> {
  const res = await fetch("http://localhost:3000/aboutTeam", {
    next: { revalidate: 10 },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت اعضای تیم");
  }
  
  const data: TeamMember[] = await res.json();
  return data.sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت داستان
async function getAboutStory(): Promise<AboutStory | null> {
  const res = await fetch("http://localhost:3000/aboutStory", {
    next: { revalidate: 10 },
    cache: 'no-store'
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
    next: { revalidate: 10 },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return null;
  }
  
  const data: AboutSettings[] = await res.json();
  return data[0] || null;
}

// فرمت کردن تاریخ
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// آیکون وضعیت فعال/غیرفعال
function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-lg ${
      isActive 
        ? "text-green-500 bg-green-500/10" 
        : "text-red-500 bg-red-500/10"
    }`}>
      {isActive ? "فعال" : "غیرفعال"}
    </span>
  );
}

export default async function AdminAboutPage() {
  const [stats, values, team, story, settings] = await Promise.all([
    getAboutStats(),
    getAboutValues(),
    getAboutTeam(),
    getAboutStory(),
    getAboutSettings()
  ]);
  
  const activeStatsCount = stats.filter(s => s.isActive).length;
  const activeValuesCount = values.filter(v => v.isActive).length;
  const activeTeamCount = team.filter(t => t.isActive).length;
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              مدیریت درباره ما
            </h1>
            <p className="text-gray-400 text-sm">
              مدیریت آمارها، ارزش‌ها، اعضای تیم و محتوای صفحه درباره ما
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/about/story/edit"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              ویرایش داستان
            </Link>
            <Link
              href="/admin/about/settings/edit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              تنظیمات
            </Link>
          </div>
        </div>
        
        {/* آمار سریع */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">آمارها</p>
            <p className="text-2xl font-bold text-white">{stats.length}</p>
            <p className="text-xs text-green-500">{activeStatsCount} فعال</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">ارزش‌ها</p>
            <p className="text-2xl font-bold text-white">{values.length}</p>
            <p className="text-xs text-green-500">{activeValuesCount} فعال</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">اعضای تیم</p>
            <p className="text-2xl font-bold text-white">{team.length}</p>
            <p className="text-xs text-green-500">{activeTeamCount} فعال</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">نام سایت</p>
            <p className="text-lg font-bold text-amber-500">{settings?.siteName || "تنظیم نشده"}</p>
          </div>
        </div>
        
        {/* تب‌های مدیریت */}
        <div className="mb-8 border-b border-gray-800">
          <div className="flex gap-6 overflow-x-auto">
            <Link href="/admin/about" className="pb-3 text-amber-500 border-b-2 border-amber-500 font-medium whitespace-nowrap">
              آمارها
            </Link>
            <Link href="/admin/about/values" className="pb-3 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
              ارزش‌ها
            </Link>
            <Link href="/admin/about/team" className="pb-3 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
              تیم ما
            </Link>
            <Link href="/admin/about/story" className="pb-3 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
              داستان
            </Link>
          </div>
        </div>
        
        {/* دکمه افزودن آمار جدید */}
        <div className="flex justify-end mb-4">
          <Link
            href="/admin/about/stats/new"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن آمار جدید
          </Link>
        </div>
        
        {/* جدول آمارها */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">مقدار</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">برچسب</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">آیکون</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">ترتیب</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">وضعیت</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">تاریخ ایجاد</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-300">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {stats.map((stat) => (
                  <tr key={stat.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{stat.value}</td>
                    <td className="px-4 py-3 text-gray-300">{stat.label}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs bg-gray-800 rounded-lg">
                        {stat.icon}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{stat.displayOrder}</td>
                    <td className="px-4 py-3"><StatusBadge isActive={stat.isActive} /></td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(stat.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <EditStatButton stat={stat} />
                        <ToggleActiveButton 
                          type="stat"
                          id={stat.id} 
                          isActive={stat.isActive} 
                          endpoint="aboutStats"
                        />
                        <DeleteStatButton id={stat.id} label={stat.label} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {stats.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">هیچ آماری یافت نشد.</p>
              <Link href="/admin/about/stats/new" className="inline-block mt-4 text-amber-500 hover:text-amber-400">
                افزودن آمار جدید
              </Link>
            </div>
          )}
        </div>
        
        {/* اطلاعات خلاصه */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {story && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-2">داستان</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{story.title}</p>
              <p className="text-gray-500 text-xs mt-2">آخرین بروزرسانی: {formatDate(story.updatedAt)}</p>
            </div>
          )}
          {settings && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-2">تنظیمات</h3>
              <p className="text-gray-400 text-sm">تعداد کارمندان: {settings.numberOfEmployees}</p>
              <p className="text-gray-400 text-sm">کشور: {settings.areaServed}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}