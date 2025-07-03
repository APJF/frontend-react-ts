"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Chapter, Subject } from "../entity";

interface UpdateChapterPageProps {
  onBack?: () => void;
  onUpdateChapter?: (chapterData: any) => void;
}

export function UpdateChapterPage({ onBack, onUpdateChapter }: UpdateChapterPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const chapter = (location.state && location.state.chapter) as Chapter | undefined;
  const course = (location.state && location.state.course) as Subject | undefined;

  const [formData, setFormData] = useState({
    id: chapter?.id || "",
    title: chapter?.title || "",
    description: chapter?.description || "",
    estimatedDuration: (chapter as any)?.estimatedDuration || "",
    level: (chapter as any)?.level || "",
    topic: (chapter as any)?.topic || "",
    prerequisiteChapter: (chapter as any)?.prerequisiteChapter || "",
    courseId: (chapter as any)?.courseId || course?.id || "",
  });

  useEffect(() => {
    if (chapter) {
      setFormData({
        id: chapter.id || "",
        title: chapter.title || "",
        description: chapter.description || "",
        estimatedDuration: (chapter as any)?.estimatedDuration || "",
        level: (chapter as any)?.level || "",
        topic: (chapter as any)?.topic || "",
        prerequisiteChapter: (chapter as any)?.prerequisiteChapter || "",
        courseId: (chapter as any)?.courseId || course?.id || "",
      });
    }
  }, [chapter, course]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chapterData = { ...formData };
    if (onUpdateChapter) onUpdateChapter(chapterData);
    navigate(-1);
  };
  const isFormValid = formData.id && formData.title && formData.description && formData.level && formData.estimatedDuration;

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="p-2 hover:bg-blue-100 text-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-blue-900">Chỉnh sửa chương</h1>
              <p className="text-sm text-blue-600">Cập nhật thông tin chương học</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Chapter ID */}
          <div>
            <Label htmlFor="id" className="text-sm font-medium text-blue-800 mb-2 block">
              Mã chương <span className="text-red-500">*</span>
            </Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              placeholder="Ví dụ: CHAP01"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-blue-800 mb-2 block">
              Tiêu đề chương <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ví dụ: Hiragana cơ bản"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-blue-800 mb-2 block">
              Mô tả chương <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả chi tiết về chương học..."
              rows={4}
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Estimated Duration */}
          <div>
            <Label htmlFor="estimatedDuration" className="text-sm font-medium text-blue-800 mb-2 block">
              Thời lượng (giờ) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="estimatedDuration"
              type="number"
              min="1"
              value={formData.estimatedDuration}
              onChange={(e) => handleInputChange("estimatedDuration", e.target.value)}
              placeholder="Ví dụ: 10"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Level */}
          <div>
            <Label htmlFor="level" className="text-sm font-medium text-blue-800 mb-2 block">
              Mức độ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="level"
              value={formData.level}
              onChange={(e) => handleInputChange("level", e.target.value)}
              placeholder="Ví dụ: N5"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Topic */}
          <div>
            <Label htmlFor="topic" className="text-sm font-medium text-blue-800 mb-2 block">
              Chủ đề
            </Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => handleInputChange("topic", e.target.value)}
              placeholder="Ví dụ: Bảng chữ cái"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Prerequisite Chapter */}
          <div>
            <Label htmlFor="prerequisiteChapter" className="text-sm font-medium text-blue-800 mb-2 block">
              Chương tiên quyết (nếu có)
            </Label>
            <Input
              id="prerequisiteChapter"
              value={formData.prerequisiteChapter}
              onChange={(e) => handleInputChange("prerequisiteChapter", e.target.value)}
              placeholder="Ví dụ: CHAP00"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Course ID */}
          <div>
            <Label htmlFor="courseId" className="text-sm font-medium text-blue-800 mb-2 block">
              Mã khóa học
            </Label>
            <Input
              id="courseId"
              value={formData.courseId}
              onChange={(e) => handleInputChange("courseId", e.target.value)}
              placeholder="Ví dụ: JPD111"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="px-6 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateChapterPage;
