// Server Component - بدون "use client"
import ContactForm from "@/app/components/ContactForm";

// تایپ اطلاعات تماس
interface ContactInfo {
  id: string;
  type: string;
  value: string;
  valueEn?: string;
  label: string;
  labelEn?: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

// تایپ ساعات کاری
interface WorkingHour {
  id: string;
  day: string;
  dayEn: string;
  dayNumber: number;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
  displayOrder: number;
  isActive: boolean;
}

// تایپ لینک‌های اجتماعی
interface SocialLink {
  id: string;
  platform: string;
  name: string;
  nameEn: string;
  url: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

// تایپ تنظیمات تماس
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

// دریافت اطلاعات تماس
async function getContactInfo(): Promise<ContactInfo[]> {
  const res = await fetch("http://localhost:3000/contactInfo", {
    next: {
      revalidate: 3600 // بازسازی هر یک ساعت
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات تماس");
  }
  
  const data: ContactInfo[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت ساعات کاری
async function getWorkingHours(): Promise<WorkingHour[]> {
  const res = await fetch("http://localhost:3000/workingHours", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت ساعات کاری");
  }
  
  const data: WorkingHour[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت لینک‌های اجتماعی
async function getSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch("http://localhost:3000/socialLinks", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error("خطا در دریافت لینک‌های اجتماعی");
  }
  
  const data: SocialLink[] = await res.json();
  return data.filter(item => item.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

// دریافت تنظیمات تماس
async function getContactSettings(): Promise<ContactSettings | null> {
  const res = await fetch("http://localhost:3000/contactSettings", {
    next: {
      revalidate: 3600
    },
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    return null;
  }
  
  const data: ContactSettings[] = await res.json();
  return data[0] || null;
}

// آیکون‌های SVG بر اساس نوع
function getContactIcon(iconName: string) {
  switch (iconName) {
    case 'phone':
      return (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case 'email':
      return (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'location':
      return (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}

// آیکون شبکه اجتماعی
function getSocialIcon(platform: string) {
  const iconClass = "w-5 h-5";
  switch (platform) {
    case 'instagram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.02-.14-.05-.2-.07-.06-.18-.04-.26-.02-.12.02-1.96 1.24-5.53 3.66-.52.36-.99.54-1.41.53-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.41-1.4-.87.03-.24.35-.49.96-.74 3.76-1.64 6.27-2.72 7.53-3.25 3.59-1.5 4.33-1.76 4.82-1.77.11 0 .34.02.5.15.12.1.16.24.17.37-.01.06 0 .21-.05.36z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.203 0 22.225 0z" />
        </svg>
      );
    case 'github':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function ContactPage() {
  const [contactInfo, workingHours, socialLinks, contactSettings] = await Promise.all([
    getContactInfo(),
    getWorkingHours(),
    getSocialLinks(),
    getContactSettings()
  ]);
  
  // جدا کردن اطلاعات تماس بر اساس نوع
  const phoneInfo = contactInfo.find(item => item.type === 'phone');
  const emailInfo = contactInfo.find(item => item.type === 'email');
  const addressInfo = contactInfo.find(item => item.type === 'address');
  
  return (
    <div className="min-h-screen bg-black py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            تماس با ما
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            ما همیشه آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* سمت راست - اطلاعات تماس */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">اطلاعات تماس</h2>
              
              {/* شماره تماس - داینامیک */}
              {phoneInfo && (
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                    {getContactIcon(phoneInfo.icon)}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{phoneInfo.label}</p>
                    <p className="text-white text-lg font-semibold dir-ltr text-left">{phoneInfo.value}</p>
                  </div>
                </div>
              )}

              {/* ایمیل - داینامیک */}
              {emailInfo && (
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                    {getContactIcon(emailInfo.icon)}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{emailInfo.label}</p>
                    <p className="text-white text-lg font-semibold">{emailInfo.value}</p>
                  </div>
                </div>
              )}

              {/* آدرس - داینامیک */}
              {addressInfo && (
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                    {getContactIcon(addressInfo.icon)}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{addressInfo.label}</p>
                    <p className="text-white text-base">{addressInfo.value}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ساعات کاری - داینامیک */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">ساعات کاری</h3>
              <div className="space-y-2 text-gray-300">
                {workingHours.map((hour) => (
                  <div key={hour.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                    <span>{hour.day}</span>
                    {hour.isOpen ? (
                      <span className="text-amber-500">{hour.openTime} - {hour.closeTime}</span>
                    ) : (
                      <span className="text-gray-500">تعطیل</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* شبکه‌های اجتماعی - داینامیک */}
            {socialLinks.length > 0 && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">شبکه‌های اجتماعی</h3>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
                      aria-label={social.name}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* سمت چپ - فرم تماس (کلاینت کامپوننت) */}
          <ContactForm contactSettings={contactSettings} />
        </div>

        {/* نقشه - داینامیک */}
        {contactSettings && (
          <div className="mt-12 md:mt-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 text-center">موقعیت ما روی نقشه</h3>
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-800">
                <iframe
                  src={contactSettings.mapEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="ChessHub Office Location"
                ></iframe>
              </div>
              <p className="text-gray-500 text-xs text-center mt-4">
                {contactSettings.mapLocation.address}
              </p>
            </div>
          </div>
        )}

        {/* JSON-LD برای سئو */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "تماس با ما | ChessHub",
              "description": "ارتباط با تیم پشتیبانی ChessHub",
              "mainEntity": {
                "@type": "Organization",
                "name": "ChessHub",
                "url": "https://chesshub.com",
                "email": emailInfo?.value || "support@chesshub.com",
                "telephone": phoneInfo?.valueEn || "+989213570389",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Tehran",
                  "addressCountry": "IR"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": phoneInfo?.valueEn || "+989213570389",
                  "contactType": "customer service",
                  "availableLanguage": ["Persian"]
                }
              }
            })
          }}
        />
      </div>
    </div>
  );
}