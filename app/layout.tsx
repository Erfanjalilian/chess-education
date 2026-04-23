import Header from "@/app/components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body className="bg-black text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}