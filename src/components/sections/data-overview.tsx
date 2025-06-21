
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BookOpen, FileText, Clock, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import type { Subject, Chapter, Slot } from "@/app/Staff/add-new-subject"

interface DataOverviewProps {
  subjects: Subject[]
  chapters: Chapter[]
  slots: Slot[]
  onTabChange: (tab: string) => void
}

export function DataOverview({ subjects, chapters, slots, onTabChange }: DataOverviewProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<number>>(new Set())
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set())

  const toggleSubject = (subjectId: number) => {
    const newExpanded = new Set(expandedSubjects)
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId)
    } else {
      newExpanded.add(subjectId)
    }
    setExpandedSubjects(newExpanded)
  }

  const toggleChapter = (chapterId: number) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  const getChaptersForSubject = (subjectId: number) => {
    return chapters.filter((chapter) => chapter.subjectId === subjectId)
  }

  const getSlotsForChapter = (chapterId: number) => {
    return slots.filter((slot) => slot.chapterId === chapterId)
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Learning subjects available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chapters</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chapters.length}</div>
            <p className="text-xs text-muted-foreground">Chapters across all subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{slots.length}</div>
            <p className="text-xs text-muted-foreground">Learning slots available</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Add new content to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onTabChange("subjects")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
            <Button
              onClick={() => onTabChange("chapters")}
              variant="outline"
              className="flex items-center gap-2"
              disabled={subjects.length === 0}
            >
              <Plus className="h-4 w-4" />
              Add Chapter
            </Button>
            <Button
              onClick={() => onTabChange("slots")}
              variant="outline"
              className="flex items-center gap-2"
              disabled={chapters.length === 0}
            >
              <Plus className="h-4 w-4" />
              Add Slot
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Content Structure</CardTitle>
          <CardDescription>Hierarchical view of all subjects, chapters, and slots</CardDescription>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No subjects created yet. Start by adding your first subject.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject) => {
                const subjectChapters = getChaptersForSubject(subject.id!)
                const isExpanded = expandedSubjects.has(subject.id!)

                return (
                  <div key={subject.id} className="border rounded-lg p-4">
                    <Collapsible open={isExpanded} onOpenChange={() => toggleSubject(subject.id!)}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{subject.title}</h3>
                            <p className="text-sm text-muted-foreground">{subject.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{subject.level}</Badge>
                          <Badge variant="outline">{subjectChapters.length} chapters</Badge>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-4 ml-7">
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground mb-3">{subject.description}</p>

                          {subjectChapters.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">No chapters added yet</p>
                          ) : (
                            subjectChapters.map((chapter) => {
                              const chapterSlots = getSlotsForChapter(chapter.id!)
                              const isChapterExpanded = expandedChapters.has(chapter.id!)

                              return (
                                <div key={chapter.id} className="border-l-2 border-gray-200 pl-4">
                                  <Collapsible open={isChapterExpanded} onOpenChange={() => toggleChapter(chapter.id!)}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                                      <div className="flex items-center gap-2">
                                        {isChapterExpanded ? (
                                          <ChevronDown className="h-3 w-3" />
                                        ) : (
                                          <ChevronRight className="h-3 w-3" />
                                        )}
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">{chapter.title}</span>
                                      </div>
                                      <Badge variant="outline" className="text-xs">
                                        {chapterSlots.length} slots
                                      </Badge>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="mt-2 ml-5">
                                      {chapter.description && (
                                        <p className="text-sm text-muted-foreground mb-2">{chapter.description}</p>
                                      )}

                                      {chapterSlots.length === 0 ? (
                                        <p className="text-xs text-muted-foreground italic">No slots added yet</p>
                                      ) : (
                                        <div className="space-y-1">
                                          {chapterSlots.map((slot) => (
                                            <div key={slot.id} className="flex items-center gap-2 text-sm">
                                              <Clock className="h-3 w-3 text-orange-600" />
                                              <span>{slot.title}</span>
                                              {slot.description && (
                                                <span className="text-muted-foreground">- {slot.description}</span>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </CollapsibleContent>
                                  </Collapsible>
                                </div>
                              )
                            })
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
