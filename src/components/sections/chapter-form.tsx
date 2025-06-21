"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Subject, Chapter, Slot } from "@/app/Staff/add-new-subject"

interface ChapterFormProps {
  onSubmit: (chapter: Chapter) => void
  subjects: Subject[]
}

export function ChapterForm({ onSubmit, subjects }: ChapterFormProps) {
  const [formData, setFormData] = useState<Omit<Chapter, "id" | "createdAt" | "updatedAt">>({
    title: "",
    description: "",
    orderNumber: 1,
    subjectId: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.subjectId === 0) return

    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      orderNumber: 1,
      subjectId: 0,
    })
  }

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (subjects.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No subjects available. Please create a subject first before adding chapters.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Select
          value={formData.subjectId.toString()}
          onValueChange={(value) => handleChange("subjectId", Number.parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id!.toString()}>
                {subject.title} ({subject.topic})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Chapter Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter chapter title"
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter chapter description (optional)"
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={formData.subjectId === 0}>
        Create Chapter
      </Button>
    </form>
  )
}
