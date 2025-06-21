"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Subject, Chapter, Slot } from "@/app/Staff/add-new-subject"

interface SubjectFormProps {
  onSubmit: (subject: Subject) => void
}

export function SubjectForm({ onSubmit }: SubjectFormProps) {
  const [formData, setFormData] = useState<Omit<Subject, "id" | "createdAt" | "updatedAt">>({
    title: "",
    topic: "",
    description: "",
    level: "",
    estimatedDuration: "",
    creatorId: "",
    image: "",
    orderNumber: 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: "",
      topic: "",
      description: "",
      level: "",
      estimatedDuration: "",
      creatorId: "",
      image: "",
      orderNumber: 1,
    })
  }

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter subject title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Topic *</Label>
          <Input
            id="topic"
            value={formData.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            placeholder="Enter unique topic identifier"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level *</Label>
          <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedDuration">Estimated Duration *</Label>
          <Input
            id="estimatedDuration"
            value={formData.estimatedDuration}
            onChange={(e) => handleChange("estimatedDuration", e.target.value)}
            placeholder="e.g., 4 weeks, 20 hours"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="creatorId">Creator ID *</Label>
          <Input
            id="creatorId"
            value={formData.creatorId}
            onChange={(e) => handleChange("creatorId", e.target.value)}
            placeholder="Enter creator identifier"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="orderNumber">Order Number *</Label>
          <Input
            id="orderNumber"
            type="number"
            value={formData.orderNumber}
            onChange={(e) => handleChange("orderNumber", Number.parseInt(e.target.value) || 1)}
            min="1"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL *</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="Enter image URL"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter detailed subject description"
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Create Subject
      </Button>
    </form>
  )
}
