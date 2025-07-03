import AutoLayout from "@/components/layout/AutoLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Info, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialDemo {
  type: string;
  title: string;
  description: string;
  url?: string;
}

const UnitDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu unit, chapter, course từ location.state
  const unit = location.state?.unit;
  const chapter = location.state?.chapter;
  const course = location.state?.course;

  if (!unit || !chapter || !course) {
    return (
      <AutoLayout>
        <div className="p-6 text-red-600 font-semibold">
          Không tìm thấy dữ liệu bài học, chương hoặc khóa học.
          <button onClick={() => navigate(-1)} className="text-blue-600 underline ml-2">Quay lại</button>
        </div>
      </AutoLayout>
    );
  }

  // Demo material nếu thiếu
  const materials: MaterialDemo[] = unit.materials && unit.materials.length > 0 ? unit.materials : [
    { type: 'vocabulary', title: 'Từ vựng Hiragana', description: 'Danh sách từ vựng cơ bản', url: '#' },
    { type: 'grammar', title: 'Ngữ pháp Hiragana', description: 'Các cấu trúc ngữ pháp', url: '#' },
    { type: 'reading', title: 'Bài đọc mẫu', description: 'Đọc hiểu cơ bản', url: '#' },
  ];

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
              <div className="space-y-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-600 font-medium text-xs">ID KHÓA HỌC</span>
                    <Badge className="bg-blue-600 text-white font-mono text-xs">{course.id}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium text-xs mb-1">TÊN KHÓA HỌC</div>
                  <h3 className="text-blue-900 font-bold text-sm leading-tight">{course.title}</h3>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-700 font-medium text-xs">MỨC ĐỘ</span>
                    <Badge className="bg-green-600 text-white text-xs">{course.level}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium text-xs mb-1">CHỦ ĐỀ</div>
                  <div className="text-blue-900 font-semibold">{course.topic}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Thông tin chi tiết bài học */}
        <div className="md:col-span-2">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate(-1)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold text-blue-900">Chi tiết bài học</h1>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                  onClick={() => navigate('/updateunit', { state: { unit, chapter, course } })}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button
                  variant={unit.status === 'active' ? 'outline' : 'secondary'}
                  className={unit.status === 'active' ? 'text-green-600 border-green-300 hover:bg-green-50 bg-transparent' : 'text-gray-500 border-gray-300 hover:bg-gray-100 bg-transparent'}
                  onClick={() => {
                    // Toggle trạng thái (demo)
                    unit.status = unit.status === 'active' ? 'deactive' : 'active';
                  }}
                >
                  {unit.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-blue-600 font-medium text-sm">Mã bài học</span>
                  <div className="text-lg font-mono font-bold text-blue-900 mt-1">{unit.unitId}</div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">Tiêu đề bài học</span>
                  <div className="text-lg font-bold text-blue-900 mt-1">{unit.title}</div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">Mô tả bài học</span>
                  <div className="text-base text-blue-800 mt-1 whitespace-pre-line">{unit.description}</div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">Bài học tiên quyết</span>
                  <div className="text-base text-blue-800 mt-1">{unit.prerequisiteUnit || "Không có"}</div>
                </div>
              </div>
              {/* Danh sách tài liệu/materials */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Danh sách tài liệu ({materials.length})
                </h2>
                <div className="space-y-3">
                  {materials.map((mat: MaterialDemo, idx: number) => (
                    <div key={mat.title + idx} className="p-4 bg-white rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center gap-2 shadow-sm">
                      <div className="flex-1">
                        <div className="font-semibold text-blue-900">{mat.title}</div>
                        <div className="text-blue-700 text-sm mb-1">{mat.description}</div>
                        <div className="text-xs text-blue-500">Kỹ năng: {mat.type}</div>
                      </div>
                      <div className="flex gap-2">
                        {mat.url && (
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent" onClick={() => window.open(mat.url, '_blank')}>
                            Xem tài liệu
                          </Button>
                        )}
                        {mat.url && (
                          <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50 bg-transparent" onClick={() => {
                            if (!mat.url) return;
                            const link = document.createElement('a');
                            link.href = mat.url;
                            link.download = mat.title;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}>
                            Tải tài liệu
                          </Button>
                        )}
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

export default UnitDetailPage;
