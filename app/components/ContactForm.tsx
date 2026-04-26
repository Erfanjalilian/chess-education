"use client";

import { useState } from "react";

interface ContactSettings {
  id: string;
  mapEmbedUrl: string;
  mapLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  emailConfig: {
    adminEmail: string;
    supportEmail: string;
    noreplyEmail: string;
  };
  formSettings: {
    showPhoneField: boolean;
    phoneRequired: boolean;
    showSubjectField: boolean;
    subjectRequired: boolean;
    maxMessageLength: number;
    minMessageLength: number;
  };
}

interface ContactFormProps {
  contactSettings: ContactSettings | null;
}

export default function ContactForm({ contactSettings }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSubjectLabel = (subject: string): string => {
    const labels: Record<string, string> = {
      support: 'پشتیبانی و مشکلات فنی',
      sales: 'مشاوره خرید دوره',
      partnership: 'همکاری و مشارکت',
      suggestion: 'پیشنهادات و انتقادات',
      other: 'سایر موارد',
    };
    return labels[subject] || 'سایر موارد';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject') as string;
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || null,
      subject: subject,
      subjectLabel: getSubjectLabel(subject),
      message: formData.get('message'),
      status: 'unread',
      isRead: false,
      isReplied: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    
    try {
      const res = await fetch('http://localhost:3000/contactMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setSuccess('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
        e.currentTarget.reset();
      } else {
        setError('خطا در ارسال پیام. لطفاً مجدداً تلاش کنید.');
      }
    } catch {
      setError('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.');
    }
    
    setLoading(false);
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">ارسال پیام</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-3 text-center text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-center text-sm">
            {error}
          </div>
        )}
        
        {/* نام و نام خانوادگی */}
        <div>
          <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
            نام و نام خانوادگی *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
        </div>

        {/* آدرس ایمیل */}
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
            آدرس ایمیل *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            placeholder="example@domain.com"
          />
        </div>

        {/* شماره تماس (اختیاری) - داینامیک */}
        {contactSettings?.formSettings.showPhoneField !== false && (
          <div>
            <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
              شماره تماس {contactSettings?.formSettings.phoneRequired ? '*' : '(اختیاری)'}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required={contactSettings?.formSettings.phoneRequired || false}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            />
          </div>
        )}

        {/* موضوع - داینامیک */}
        {contactSettings?.formSettings.showSubjectField !== false && (
          <div>
            <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
              موضوع {contactSettings?.formSettings.subjectRequired ? '*' : ''}
            </label>
            <select
              id="subject"
              name="subject"
              required={contactSettings?.formSettings.subjectRequired || false}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            >
              <option value="">انتخاب کنید</option>
              <option value="support">پشتیبانی و مشکلات فنی</option>
              <option value="sales">مشاوره خرید دوره</option>
              <option value="partnership">همکاری و مشارکت</option>
              <option value="suggestion">پیشنهادات و انتقادات</option>
              <option value="other">سایر موارد</option>
            </select>
          </div>
        )}

        {/* پیام */}
        <div>
          <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
            پیام شما *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={contactSettings?.formSettings.minMessageLength || 10}
            maxLength={contactSettings?.formSettings.maxMessageLength || 1000}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
            placeholder="پیام خود را بنویسید..."
          ></textarea>
          <p className="text-gray-500 text-xs mt-1">
            حداقل {contactSettings?.formSettings.minMessageLength || 10} و حداکثر {contactSettings?.formSettings.maxMessageLength || 1000} کاراکتر
          </p>
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:transform-none"
        >
          {loading ? 'در حال ارسال...' : 'ارسال پیام'}
        </button>

        <p className="text-gray-500 text-xs text-center mt-4">
          * تمامی فیلدهای دارای ستاره اجباری هستند
        </p>
      </form>
    </div>
  );
}