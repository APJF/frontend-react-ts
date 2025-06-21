"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubjectForm } from "@/components/sections/subject-form"
import { ChapterForm } from "@/components/sections/chapter-form"
import { SlotForm } from "@/components/sections/slot-form"
import { DataOverview } from "@/components/sections/data-overview"
import { BookOpen, FileText, Clock, Plus } from "lucide-react"

export interface Subject {
  id?: number
  title: string
  topic: string
  description: string
  level: string
  estimatedDuration: string
  creatorId: string
  image: string
  orderNumber: number
  createdAt?: string
  updatedAt?: string
  chapters?: Chapter[]
}

export interface Chapter {
  id?: number
  title: string
  description: string
  orderNumber: number
  subjectId: number
  createdAt?: string
  updatedAt?: string
  slots?: Slot[]
}

export interface Slot {
  id?: number
  title: string
  description: string
  orderNumber: number
  chapterId: number
  createdAt?: string
  updatedAt?: string
}

export default function CMSStaffInterface() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [slots, setSlots] = useState<Slot[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  const addSubject = (subject: Subject) => {
    const newSubject = {
      ...subject,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chapters: [],
    }
    setSubjects((prev) => [...prev, newSubject])
  }

  const addChapter = (chapter: Chapter) => {
    const newChapter = {
      ...chapter,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slots: [],
    }
    setChapters((prev) => [...prev, newChapter])

    // Update the subject to include this chapter
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === chapter.subjectId
          ? { ...subject, chapters: [...(subject.chapters || []), newChapter] }
          : subject,
      ),
    )
  }

  const addSlot = (slot: Slot) => {
    const newSlot = {
      ...slot,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setSlots((prev) => [...prev, newSlot])

    // Update the chapter to include this slot
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === slot.chapterId ? { ...chapter, slots: [...(chapter.slots || []), newSlot] } : chapter,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS Staff Interface</h1>
          <p className="text-gray-600">Manage subjects, chapters, and slots for the learning management system</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Add Subject
            </TabsTrigger>
            <TabsTrigger value="chapters" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Chapter
            </TabsTrigger>
            <TabsTrigger value="slots" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Add Slot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DataOverview subjects={subjects} chapters={chapters} slots={slots} onTabChange={setActiveTab} />
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Add New Subject</CardTitle>
                <CardDescription>Create a new subject with all required information</CardDescription>
              </CardHeader>
              <CardContent>
                <SubjectForm onSubmit={addSubject} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chapters">
            <Card>
              <CardHeader>
                <CardTitle>Add New Chapter</CardTitle>
                <CardDescription>Add a chapter to an existing subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ChapterForm onSubmit={addChapter} subjects={subjects} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slots">
            <Card>
              <CardHeader>
                <CardTitle>Add New Slot</CardTitle>
                <CardDescription>Add a slot to an existing chapter</CardDescription>
              </CardHeader>
              <CardContent>
                <SlotForm onSubmit={addSlot} chapters={chapters} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
