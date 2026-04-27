// Server Component
import Link from "next/link";
import Image from "next/image";
import EditTeamButton from "@/app/components/admin/about/EditTeamButton";
import DeleteTeamButton from "@/app/components/admin/about/DeleteTeamButton";
import ToggleActiveButton from "@/app/components/admin/about/ToggleActiveButton";

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

export default async function AdminAboutTeamPage() {
  const team = await getAboutTeam();
  
  return (
    <div className="min-h-screen bg-black py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">مدیریت تیم</h1>
            <p className="text-gray-400 text-sm">مدیریت اعضای تیم ChessHub</p>
          </div>
          <Link
            href="/admin/about/team/new"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن عضو جدید
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="relative h-48 bg-gray-800">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-amber-500 text-sm">{member.role}</p>
                  </div>
                  <StatusBadge isActive={member.isActive} />
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{member.bio}</p>
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-700">
                  <EditTeamButton member={member} />
                  <ToggleActiveButton 
                    type="team"
                    id={member.id} 
                    isActive={member.isActive} 
                    endpoint="aboutTeam"
                  />
                  <DeleteTeamButton id={member.id} name={member.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {team.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">هیچ عضوی در تیم یافت نشد.</p>
            <Link href="/admin/about/team/new" className="inline-block mt-4 text-amber-500 hover:text-amber-400">
              افزودن عضو جدید
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}