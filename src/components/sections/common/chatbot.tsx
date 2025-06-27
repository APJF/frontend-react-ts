"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Bot,
  User,
  Loader2,
  Plus,
  MessageSquare,
  X,
  Search,
  Settings,
  Menu,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messages: Message[]
}

const initialMessage: Message = {
  id: "1",
  content:
    "Xin chào! Tôi là AI Assistant của trung tâm tiếng Nhật. Bạn cần hỗ trợ gì hôm nay? ",
  role: "assistant",
  timestamp: new Date(),
}

export default function Chatbot() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentChatId, setCurrentChatId] = useState<string>("")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentChat = chatSessions.find((chat) => chat.id === currentChatId)
  const currentMessages = currentChat?.messages || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages])

  useEffect(() => {
    fetch("/sessions/user/123")
      .then((res) => res.json())
      .then((data) => {
        const sessions = data.map((s: any) => ({
          id: s.id,
          title: s.title,
          lastMessage: s.lastMessage || "",
          timestamp: new Date(s.timestamp),
          messages: [],
        }))
        setChatSessions(sessions)
        if (sessions.length) setCurrentChatId(sessions[0].id)
      })
  }, [])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage, { id: "typing", content: "", role: "assistant", timestamp: new Date(), isTyping: true }],
              lastMessage: content,
              timestamp: new Date(),
            }
          : chat,
      ),
    )

    setInputValue("")
    setIsLoading(true)

    try {
      const res = await fetch("/chat/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: currentChatId, user_input: content }),
      })
      const data = await res.json()

      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages.filter((m) => m.id !== "typing"),
                  {
                    id: Date.now().toString(),
                    content: data.ai_response,
                    role: "assistant",
                    timestamp: new Date(),
                  },
                ],
                lastMessage: data.ai_response.slice(0, 50) + "...",
                timestamp: new Date(),
              }
            : chat,
        ),
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewChat = async () => {
    const res = await fetch("/sessions", { method: "POST" })
    const data = await res.json()
    const newChat: ChatSession = {
      id: data.session_id,
      title: "Cuộc trò chuyện mới",
      lastMessage: "Bắt đầu...",
      timestamp: new Date(),
      messages: [initialMessage],
    }
    setChatSessions((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }

  const deleteChat = async (chatId: string) => {
    await fetch(`/sessions/${chatId}`, { method: "DELETE" })
    const updated = chatSessions.filter((chat) => chat.id !== chatId)
    setChatSessions(updated)
    if (currentChatId === chatId) {
      updated.length ? setCurrentChatId(updated[0].id) : createNewChat()
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date(), diff = now.getTime() - date.getTime()
    const mins = Math.floor(diff / 60000), hrs = Math.floor(mins / 60), days = Math.floor(hrs / 24)
    if (mins < 1) return "Vừa xong"
    if (mins < 60) return `${mins} phút trước`
    if (hrs < 24) return `${hrs} giờ trước`
    return `${days} ngày trước`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  // UI rendering skipped in this snippet to focus on logic cleanup
  return null
}
