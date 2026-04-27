"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface EditStatButtonProps {
  stat: AboutStat;
}

export default function EditStatButton({ stat }: EditStatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    value: stat.value,
    valueRaw: stat.valueRaw,
    label: stat.label,
    labelEn: stat.labelEn,
    icon: stat.icon,
    displayOrder: stat.displayOrder,
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch(`http://localhost:3000/aboutStats/${stat.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        updatedAt: new Date().toISOString(),
      }),
    });
    
    if (res.ok) {
      router.refresh();
      setIsOpen(false);
    }
    
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
        title="ویرایش"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md mx-4 border border-gray-700 w-full">
            <h3 className="text-xl font-bold text-white mb-4">ویرایش آمار</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">مقدار نمایشی</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">مقدار عددی</label>
                <input
                  type="number"
                  value={formData.valueRaw}
                  onChange={(e) => setFormData({ ...formData, valueRaw: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">برچسب (فارسی)</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">برچسب (انگلیسی)</label>
                <input
                  type="text"
                  value={formData.labelEn}
                  onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">آیکون</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                >
                  <option value="students">دانشجویان</option>
                  <option value="courses">دوره‌ها</option>
                  <option value="instructors">مربیان</option>
                  <option value="visitors">بازدیدکنندگان</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">ترتیب نمایش</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}