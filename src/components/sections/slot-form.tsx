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

interface SlotFormProps {
  onSubmit: (slot: Slot) => void
  chapters: Chapter[]
}

export function SlotForm({ onSubmit, chapters }: SlotFormProps) {
  const [formData, setFormData] = useState<Omit<Slot, "id" | "createdAt" | "updatedAt">>({
    title: "",
    description: "",
    orderNumber: 1,
    chapterId: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.chapterId === 0) return

    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      orderNumber: 1,
      chapterId: 0,
    })
  }

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (chapters.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>No chapters available. Please create a chapter first before adding slots.</AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="chapter">Chapter *</Label>
        <Select
          value={formData.chapterId.toString()}
          onValueChange={(value) => handleChange("chapterId", Number.parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter) => (
              <SelectItem key={chapter.id} value={chapter.id!.toString()}>
                {chapter.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Slot Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter slot title"
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
          placeholder="Enter slot description (optional)"
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={formData.chapterId === 0}>
        Create Slot
      </Button>
    </form>
  )
}
