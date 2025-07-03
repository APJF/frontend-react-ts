import AutoLayout from "@/components/layout/AutoLayout";
import type { Subject, Chapter } from "@/components/sections/entity";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Info, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ChapterDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu chapter và course từ location.state
  const chapter = location.state?.chapter as Chapter | undefined;
  const course = location.state?.course as Subject | undefined;

  if (!chapter || !course) {
    return (
      <AutoLayout>
        <div className="p-6 text-red-600 font-semibold">
          Không tìm thấy dữ liệu chương hoặc khóa học.
          <button onClick={() => navigate(-1)} className="text-blue-600 underline ml-2">Quay lại</button>
        </div>
      </AutoLayout>
    );
  }

  // Demo type cho Unit
  type UnitDemo = {
    unitId: string;
    title: string;
    description: string;
    prerequisiteUnit?: string;
    url?: string;
  };

  // Bổ sung status và các trường cho chapter demo nếu thiếu
  const chapterWithStatus: any = {
    ...chapter,
    status: (chapter as any).status || 'active',
    courseId: (chapter as any).courseId || course.id || 'JPD111',
    topic: (chapter as any).topic || course.topic || 'Chủ đề demo',
    description: (chapter as any).description || 'Mô tả chương demo',
    estimatedDuration: (chapter as any).estimatedDuration || course.estimatedDuration || '10 giờ',
    level: (chapter as any).level || course.level || 'N5',
    prerequisiteCourse: (chapter as any).prerequisiteCourse || (course as any).prerequisiteCourse || '', // Sửa lỗi truy cập trường không tồn tại
  };

  // State để trigger re-render khi đổi trạng thái
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
                  <img src={course.image} alt="Course" className="w-20 h-20 object-cover rounded-lg shadow-lg" />
                </div>
              </div>
              {/* Bổ sung các trường courseID, tiêu đề, chủ đề, mô tả, estimatedDuration, level, prerequisiteCourse */}
              <div className="space-y-2 text-left text-blue-900 text-base font-medium">
                <div><span className="font-semibold">Mã khóa học:</span> {course.id || 'JPD111'}</div>
                <div><span className="font-semibold">Tiêu đề:</span> {course.title || 'Tiếng Nhật sơ cấp N5'}</div>
                <div><span className="font-semibold">Chủ đề:</span> {course.topic || 'Giao tiếp cơ bản'}</div>
                <div><span className="font-semibold">Level:</span> {course.level || 'N5'}</div>
                <div><span className="font-semibold">Thời gian hoàn thành:</span> {course.estimatedDuration || '60 giờ'}</div>
                <div><span className="font-semibold">Khóa học tiên quyết:</span> {(course as any).prerequisiteCourse || 'Không có'}</div>
              </div>
              <div className="mt-4 text-blue-700 text-sm">
                <span className="font-semibold">Mô tả:</span> {course.description || 'Khóa học tiếng Nhật N5 dành cho người mới bắt đầu, giúp bạn nắm vững các kiến thức cơ bản nhất của tiếng Nhật như Hiragana, Katakana, 100 chữ Kanji cơ bản, và các cấu trúc ngữ pháp cơ bản.'}
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
                <Button onClick={() => navigate('/addunit', { state: { chapter, course } })} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
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
                    backgroundColor: chapterWithStatus.status === 'active' ? '#22c55e' : '#ef4444', // xanh lá hoặc đỏ
                    color: 'white',
                    border: 'none',
                    boxShadow: chapterWithStatus.status === 'active' ? '0 2px 8px #bbf7d0' : '0 2px 8px #fecaca',
                  }}
                  onClick={() => {
                    chapterWithStatus.status = chapterWithStatus.status === 'active' ? 'deactive' : 'active';
                    // Force re-render
                    navigate('.', { state: { chapter: { ...chapterWithStatus, status: chapterWithStatus.status }, course } });
                  }}
                >
                  {chapterWithStatus.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
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
                  <div className="text-base text-blue-800 mt-1">{(chapterWithStatus as any).prerequisiteChapter || "Không có"}</div>
                </div>
                
                
              </div>
              {/* Danh sách bài học/unit */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Danh sách bài học (3)
                </h2>
                <div className="space-y-3">
                  {((chapter as any).units && (chapter as any).units.length > 0
                    ? (chapter as any).units as UnitDemo[]
                    : [
                        { unitId: 'U1', title: 'Giới thiệu Hiragana', description: 'Bài học nhập môn về Hiragana', prerequisiteUnit: '', url: '#' },
                        { unitId: 'U2', title: 'Từ vựng cơ bản', description: 'Từ vựng thường gặp trong đời sống', prerequisiteUnit: 'U1', url: '#' },
                        { unitId: 'U3', title: 'Ngữ pháp cơ bản', description: 'Các cấu trúc ngữ pháp nền tảng', prerequisiteUnit: 'U2', url: '#' },
                      ]
                  ).map((unit: UnitDemo, idx: number) => (
                    <div key={unit.unitId || idx} className="p-4 bg-white rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center gap-2 shadow-sm">
                      <div className="flex-1">
                        <div className="font-semibold text-blue-900">{unit.title}</div>
                        <div className="text-blue-700 text-sm mb-1">{unit.description}</div>
                        <div className="text-xs text-blue-500">Mã unit: {unit.unitId || idx + 1}</div>
                        {unit.prerequisiteUnit && (
                          <div className="text-xs text-blue-500">Unit tiên quyết: {unit.prerequisiteUnit}</div>
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
                  ))}
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
