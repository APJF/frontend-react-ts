import AutoLayout from "@/components/layout/AutoLayout";
import type { Course, Chapter } from "@/components/sections/entity";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Info, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ChapterDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy chapterId từ location.state hoặc từ chapter truyền vào
  const chapterState = location.state?.chapter as Chapter | undefined;
  const course = location.state?.course as Course | undefined;
  const chapterId = chapterState?.id || location.state?.chapterId;

  const [chapter, setChapter] = useState<any>(chapterState || null);
  const [loading, setLoading] = useState<boolean>(!chapterState);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!chapterId) return;
    if (chapterState) return; // đã có dữ liệu từ state
    setLoading(true);
    setError("");
    fetch(`http://localhost:8080/api/chapters/${chapterId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setChapter(res.data);
        } else {
          setError("Không tìm thấy chương.");
        }
      })
      .catch(() => setError("Không thể tải dữ liệu chương."))
      .finally(() => setLoading(false));
  }, [chapterId, chapterState]);

  if (!chapterId || (!chapter && !loading)) {
    return (
      <AutoLayout>
        <div className="p-6 text-red-600 font-semibold">
          Không tìm thấy dữ liệu chương hoặc khóa học.
          <button onClick={() => navigate(-1)} className="text-blue-600 underline ml-2">Quay lại</button>
        </div>
      </AutoLayout>
    );
  }

  if (loading) {
    return (
      <AutoLayout>
        <div className="p-6 text-blue-600 font-semibold">Đang tải dữ liệu chương...</div>
      </AutoLayout>
    );
  }

  // Map lại dữ liệu cho đồng nhất UI
  const chapterWithStatus: any = {
    ...chapter,
    status: chapter.status || 'active',
    courseId: chapter.courseId || course?.id || '',
    topic: course?.topics || '',
    description: chapter.description || '',
    estimatedDuration: chapter.estimatedDuration || course?.duration || '',
    level: chapter.level || course?.level || '',
    prerequisiteCourse: chapter.prerequisiteCourse || '',
  };
  const [status, setStatus] = useState<string>(chapterWithStatus.status);

  return (
    <AutoLayout>
      <div className="max-w-5xl mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Thông tin tổng quan khóa học */}
        <div className="md:col-span-1">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-24">
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-blue-900">Thông tin khóa học</h2>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>
              <div className="mb-6">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-200 flex items-center justify-center relative overflow-hidden">
                  {course?.image && <img src={course.image} alt="Course" className="w-20 h-20 object-cover rounded-lg shadow-lg" />}
                </div>
              </div>
              <div className="space-y-2 text-left text-blue-900 text-base font-medium">
                <div><span className="font-semibold">Mã khóa học:</span> {course?.id || chapterWithStatus.courseId}</div>
                <div><span className="font-semibold">Tiêu đề:</span> {course?.title || ''}</div>
                <div>
                  <span className="font-semibold">Chủ đề:</span>{" "}
                  {Array.isArray(course?.topics)
                    ? course.topics.map((topic: any, idx: number) => (
                        <span key={topic.id || idx}>
                          {topic.name || topic}
                          {idx < (course.topics?.length ?? 0) - 1 ? ", " : ""}
                        </span>
                      ))
                    : course?.topics || course?.topics || ""}
                </div>
                <div><span className="font-semibold">Level:</span> {course?.level || ''}</div>
                <div><span className="font-semibold">Thời gian hoàn thành:</span> {course?.duration || ''}</div>
                <div><span className="font-semibold">Khóa học tiên quyết:</span> {(course as any)?.prerequisiteCourse || 'Không có'}</div>
              </div>
              <div className="mt-4 text-blue-700 text-sm">
                <span className="font-semibold">Mô tả:</span> {course?.description || ''}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Thông tin chi tiết chương */}
        <div className="md:col-span-2">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate(-1)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold text-blue-900">Chi tiết chương</h1>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Button 
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Add Unit button clicked", { courseId: course?.id, chapterId: chapterWithStatus?.id });
                    const targetUrl = `/addunit/${course?.id}/${chapterWithStatus?.id}`;
                    console.log("Navigating to:", targetUrl);
                    navigate(targetUrl);
                  }} 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm bài học
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                  onClick={() => navigate('/updatechapter', { state: { chapter: chapterWithStatus, course } })}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button
                  style={{
                    backgroundColor: chapterWithStatus.status === 'PUBLISHED' ? '#22c55e' : '#f59e42',
                    color: 'white',
                    border: 'none',
                    boxShadow: chapterWithStatus.status === 'PUBLISHED' ? '0 2px 8px #bbf7d0' : '0 2px 8px #fed7aa',
                    cursor: 'default',
                    pointerEvents: 'none',
                    opacity: 1
                  }}
                  disabled
                >
                  {chapterWithStatus.status === 'PUBLISHED' ? 'Đã xuất bản' : chapterWithStatus.status === 'DRAFT' ? 'Bản nháp' : chapterWithStatus.status}
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-blue-600 font-medium text-sm">Mã chương</span>
                  <div className="text-lg font-mono font-bold text-blue-900 mt-1">{chapterWithStatus.id}</div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">Tiêu đề chương</span>
                  <div className="text-lg font-bold text-blue-900 mt-1">{chapterWithStatus.title}</div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">Mô tả chương</span>
                  <div className="text-base text-blue-800 mt-1 whitespace-pre-line">{chapterWithStatus.description}</div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">Chương tiên quyết</span>
                  <div className="text-base text-blue-800 mt-1">{chapterWithStatus.prerequisiteChapterId || "Không có"}</div>
                </div>
              </div>
              {/* Danh sách bài học/unit */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Danh sách bài học ({chapterWithStatus.units?.length || 0})
                </h2>
                <div className="space-y-3">
                  {chapterWithStatus.units && chapterWithStatus.units.length > 0 ? (
                    chapterWithStatus.units.map((unit: any, idx: number) => (
                      <div key={unit.id || idx} className="p-4 bg-white rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center gap-2 shadow-sm">
                        <div className="flex-1">
                          <div className="font-semibold text-blue-900">{unit.title}</div>
                          <div className="text-blue-700 text-sm mb-1">{unit.description}</div>
                          <div className="text-xs text-blue-500">Mã unit: {unit.id}</div>
                          {unit.prerequisiteUnitId && (
                            <div className="text-xs text-blue-500">Unit tiên quyết: {unit.prerequisiteUnitId}</div>
                          )}
                        </div>
                        <div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                            onClick={() => navigate('/unitdetail', { state: { unit, chapter, course } })}
                          >
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-blue-500">Chưa có bài học nào trong chương này.</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AutoLayout>
  );
};

export default ChapterDetailPage;
