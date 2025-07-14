import AutoLayout from "@/components/layout/AutoLayout";
import { Chapter } from "@/components/sections/entity";
import { AddLessonPage } from "@/components/sections/staff/add-unit-page";
import { Course } from "@/types/courses";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AddNewUnit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, chapterId } = useParams(); // Lấy params từ URL
  const [course, setCourse] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Log ngay khi component được khởi tạo
  console.log("[AddNewUnit] Component mounted with params:", { courseId, chapterId });

  useEffect(() => {
    // Thêm logs chi tiết hơn để debug
    console.log("AddNewUnit - Current URL:", window.location.href);
    console.log("AddNewUnit - URL path params:", { courseId, chapterId });
    console.log("AddNewUnit - Location state:", location.state);
    
    // Double check if params are valid
    if (!courseId) {
      console.error("Missing courseId in URL parameters");
    }
    
    if (!chapterId) {
      console.error("Missing chapterId in URL parameters");
    }
    
    if (courseId && chapterId) {
      setIsLoading(true);
      setError(null);
      
      const courseApiUrl = `http://localhost:8080/api/courses/${courseId}`;
      console.log("Fetching course from:", courseApiUrl);
      
      // Fetch course
      fetch(courseApiUrl)
        .then(res => {
          console.log("Course API response status:", res.status);
          return res.json();
        })
        .then(res => {
          console.log("Course API response data:", res);
          if (res.success && res.data) {
            console.log("Setting course data:", res.data);
            setCourse(res.data);
            
            // Fetch chapter details
            const chapterApiUrl = `http://localhost:8080/api/chapters/${chapterId}`;
            console.log("Fetching chapter from:", chapterApiUrl);
            return fetch(chapterApiUrl);
          } else {
            console.error("Course API returned error:", res);
            throw new Error(res.message || "Không tìm thấy thông tin khóa học");
          }
        })
        .then(chapterRes => {
          console.log("Chapter API response status:", chapterRes.status);
          return chapterRes.json();
        })
        .then(chapterRes => {
          console.log("Chapter API response data:", chapterRes);
          if (chapterRes.success && chapterRes.data) {
            console.log("Setting chapter data:", chapterRes.data);
            setChapter(chapterRes.data);
          } else {
            console.error("Chapter API returned error:", chapterRes);
            throw new Error(chapterRes.message || "Không tìm thấy thông tin chương học");
          }
        })
        .catch(err => {
          console.error("Error fetching data:", err);
          setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error("Missing required parameters:", { courseId, chapterId });
      setError("Thiếu thông tin khóa học hoặc chương học");
      setIsLoading(false);
    }
  }, [courseId, chapterId]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCreateLesson = (lessonData: {
    unitId: string;
    unitDescription: string;
    prerequisiteUnit: string;
    chapterId: number;
    materials: Array<{
      skill: string;
      name: string;
      description: string;
      url: string;
    }>;
  }) => {
    console.log('Tạo unit mới:', lessonData);
    // This function is actually not being used because the AddLessonPage component 
    // handles its own submission directly to the API, but we keep it as a backup
    alert('Tạo bài học thành công!');
    navigate(`/detail/${courseId}`); // Navigate back to course detail after success
  };

  if (isLoading) {
    return (
      <AutoLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-blue-900">Đang tải dữ liệu...</h3>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left max-w-xl mx-auto">
              <h4 className="font-semibold mb-2"></h4>
              
              <div className="mt-4">
                <Button
                  onClick={() => {
                    // Thử load lại trang
                    window.location.reload();
                  }}
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Tải lại trang
                </Button>
                <Button
                  onClick={() => {
                    // Quay lại trang trước đó
                    navigate(-1);
                  }}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Quay lại
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AutoLayout>
    );
  }

  if (error) {
    return (
      <AutoLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-900 mb-2">Lỗi</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => navigate(-1)} 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </AutoLayout>
    );
  }

  if (!course || !chapter) {
    return (
      <AutoLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-yellow-50 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium text-yellow-900 mb-2">Không tìm thấy dữ liệu</h3>
            <p className="text-yellow-700 mb-4">Không thể tìm thấy thông tin khóa học hoặc chương học. Vui lòng thử lại.</p>
            <button 
              onClick={() => navigate(-1)} 
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </AutoLayout>
    );
  }

  return (
    <AutoLayout>
      <AddLessonPage
        course={course}
        chapter={chapter}
        onBack={handleBack}
        onCreateLesson={handleCreateLesson}
      />
    </AutoLayout>
  );
};

export default AddNewUnit;
