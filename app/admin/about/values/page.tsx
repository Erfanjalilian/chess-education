// Server Component
import Link from "next/link";
import EditValueButton from "@/app/components/admin/about/EditValueButton";
import DeleteValueButton from "@/app/components/admin/about/DeleteValueButton";
import ToggleActiveButton from "@/app/components/admin/about/ToggleActiveButton";

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

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

export default async function AdminAboutValuesPage() {
  const values = await getAboutValues();
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">مدیریت ارزش‌ها</h1>
            <p className="text-gray-400 text-sm">مدیریت ارزش‌های اصلی سایت</p>
          </div>
          <Link
            href="/admin/about/values/new"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن ارزش جدید
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">عنوان</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">توضیحات</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">آیکون</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">ترتیب</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-300">وضعیت</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-300">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {values.map((value) => (
                  <tr key={value.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{value.title}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm max-w-xs line-clamp-2">{value.description}</td>
                    <td className="px-4 py-3 text-2xl">{value.icon}</td>
                    <td className="px-4 py-3 text-gray-300">{value.displayOrder}</td>
                    <td className="px-4 py-3"><StatusBadge isActive={value.isActive} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <EditValueButton value={value} />
                        <ToggleActiveButton 
                          type="value"
                          id={value.id} 
                          isActive={value.isActive} 
                          endpoint="aboutValues"
                        />
                        <DeleteValueButton id={value.id} title={value.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}