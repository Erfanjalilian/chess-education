import CourseCategories from "./components/CourseCategories";
import MostPopularCourses from "./components/MostPopularCourses";
import MostPopularBlogs from "./components/MostPopularBlogs";
export default function Home() {
  return (
   <div>
    <CourseCategories />
    <MostPopularCourses />
    <MostPopularBlogs />
   </div>
  );
}
