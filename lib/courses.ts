// lib/courses.ts - Data fetching layer
export async function getAllCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    cache: 'force-cache', // Cache on server for static generation
    next: {
      revalidate: 3600 // ISR - revalidate every hour
    }
  });
  
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

export async function getCategoriesWithCourses() {
  const courses = await getAllCourses();
  
  // Group by category
  const grouped = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);
  
  // Transform and add metadata
  return Object.entries(grouped).map(([name, courses]) => ({
    name,
    slug: name.toLowerCase().replace(/ /g, '-'),
    courses,
    courseCount: courses.length,
    icon: getCategoryIcon(name),
    description: getCategoryDescription(name),
    averageRating: courses.reduce((sum, c) => sum + c.averageRating, 0) / courses.length,
    totalStudents: courses.reduce((sum, c) => sum + c.visitorsCount, 0)
  }));
}