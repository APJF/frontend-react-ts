"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface UpdateUnitPageProps {
  onBack?: () => void;
  onUpdateUnit?: (unitData: any) => void;
}

export function UpdateUnitPage({ onBack, onUpdateUnit }: UpdateUnitPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const unit = (location.state && location.state.unit) as any;
  const chapter = (location.state && location.state.chapter) as any;
  const course = (location.state && location.state.course) as any;

  const [formData, setFormData] = useState({
    unitId: unit?.id || unit?.unitId || "",
    title: unit?.title || "",
    description: unit?.description || "",
    prerequisiteUnit: unit?.prerequisiteUnit || unit?.prerequisiteUnitId || "",
    materials: unit?.materials || [],
  });

  useEffect(() => {
    if (unit) {
      setFormData({
        unitId: unit.id || unit.unitId || "",
        title: unit.title || "",
        description: unit.description || "",
        prerequisiteUnit: unit.prerequisiteUnit || unit.prerequisiteUnitId || "",
        materials: unit.materials || [],
      });
    }
  }, [unit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMaterialChange = (idx: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.map((mat: any, i: number) => i === idx ? { ...mat, [field]: value } : mat)
    }));
  };

  const handleAddMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [...prev.materials, { type: '', title: '', description: '', url: '' }]
    }));
  };

  const handleRemoveMaterial = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_: any, i: number) => i !== idx)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: formData.unitId,
      title: formData.title,
      description: formData.description,
      status: "DRAFT",
      chapterId: chapter?.id || unit?.chapterId || "",
      prerequisiteUnitId: formData.prerequisiteUnit || null,
    };
    try {
      const response = await fetch(`http://localhost:8080/api/units/${formData.unitId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": "staff-01",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Cập nhật bài học thành công!");
        navigate(-1);
      } else {
        alert(data.message || "Cập nhật bài học thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  };
  const isFormValid = formData.unitId && formData.title && formData.description;

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
              <h1 className="text-xl font-semibold text-blue-900">Chỉnh sửa bài học</h1>
              <p className="text-sm text-blue-600">Cập nhật thông tin bài học</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Unit ID */}
          <div>
            <Label htmlFor="unitId" className="text-sm font-medium text-blue-800 mb-2 block">
              Mã bài học <span className="text-red-500">*</span>
            </Label>
            <Input
              id="unitId"
              value={formData.unitId}
              readOnly
              placeholder="Ví dụ: unit-04"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
              required
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-blue-800 mb-2 block">
              Tiêu đề bài học <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ví dụ: Giới thiệu Hiragana"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-blue-800 mb-2 block">
              Mô tả bài học <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả chi tiết về bài học..."
              rows={4}
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Prerequisite Unit */}
          <div>
            <Label htmlFor="prerequisiteUnit" className="text-sm font-medium text-blue-800 mb-2 block">
              Bài học tiên quyết (nếu có)
            </Label>
            <Input
              id="prerequisiteUnit"
              value={formData.prerequisiteUnit}
              onChange={(e) => handleInputChange("prerequisiteUnit", e.target.value)}
              placeholder="Ví dụ: U0"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Materials */}
          <div>
            <Label className="text-sm font-medium text-blue-800 mb-2 block">
              Danh sách tài liệu/kỹ năng
            </Label>
            <div className="space-y-4">
              {formData.materials.map((mat: any, idx: number) => (
                <div key={idx} className="border border-blue-200 rounded-lg p-4 bg-white flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      value={mat.type}
                      onChange={e => handleMaterialChange(idx, 'type', e.target.value)}
                      placeholder="Kỹ năng (vocabulary, grammar, reading, ...)"
                      className="border-blue-300"
                    />
                    <Input
                      value={mat.title}
                      onChange={e => handleMaterialChange(idx, 'title', e.target.value)}
                      placeholder="Tên tài liệu"
                      className="border-blue-300"
                    />
                  </div>
                  <Textarea
                    value={mat.description}
                    onChange={e => handleMaterialChange(idx, 'description', e.target.value)}
                    placeholder="Mô tả tài liệu"
                    className="border-blue-300"
                  />
                  <Input
                    value={mat.url}
                    onChange={e => handleMaterialChange(idx, 'url', e.target.value)}
                    placeholder="URL tài liệu (nếu có)"
                    className="border-blue-300"
                  />
                  <Button type="button" variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 w-fit" onClick={() => handleRemoveMaterial(idx)}>
                    Xóa
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50" onClick={handleAddMaterial}>
                Thêm tài liệu/kỹ năng
              </Button>
            </div>
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

export default UpdateUnitPage;
