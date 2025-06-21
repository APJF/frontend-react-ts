"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Bot,
  User,
  Loader2,
  Plus,
  MessageSquare,
  Trash2,
  MoreHorizontal,
  Search,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
    "Xin chào! Tôi là AI Assistant của trung tâm tiếng Nhật. Tôi có thể giúp bạn tìm hiểu về các khóa học, lịch học, và trả lời mọi câu hỏi về việc học tiếng Nhật. Bạn cần hỗ trợ gì hôm nay? 🇯🇵",
  role: "assistant",
  timestamp: new Date(),
}

const sampleChatSessions: ChatSession[] = [
  {
    id: "1",
    title: "Tư vấn khóa học N5",
    lastMessage: "Cảm ơn bạn đã tư vấn!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    messages: [initialMessage],
  },
  {
    id: "2",
    title: "Lịch học và giá cả",
    lastMessage: "Tôi sẽ cân nhắc và liên hệ lại",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    messages: [initialMessage],
  },
  {
    id: "3",
    title: "Phương pháp học hiệu quả",
    lastMessage: "Có thể giải thích thêm về Kanji không?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    messages: [initialMessage],
  },
]

export default function Chatbot() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(sampleChatSessions)
  const [currentChatId, setCurrentChatId] = useState<string>("1")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentChat = chatSessions.find((chat) => chat.id === currentChatId)
  const currentMessages = currentChat?.messages || [initialMessage]

  const filteredChatSessions = chatSessions.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responses = {
      greeting: [
        "Chào bạn! Tôi rất vui được hỗ trợ bạn về việc học tiếng Nhật. 🎌",
        "Xin chào! Tôi có thể giúp bạn tìm hiểu về các khóa học tiếng Nhật của chúng tôi. ✨",
      ],
      course: [
        "Chúng tôi có các khóa học từ N5 đến N1, phù hợp với mọi trình độ. Khóa N5 dành cho người mới bắt đầu với 800 từ vựng cơ bản và 45 ngữ pháp. Bạn muốn tìm hiểu khóa nào cụ thể? 📚",
        "Các khóa học của chúng tôi được thiết kế theo chuẩn JLPT với giáo viên bản ngữ. Có khóa cơ bản (N5-N4), trung cấp (N3-N2) và nâng cao (N1). Bạn đang ở trình độ nào? 🎯",
      ],
      default: [
        "Đó là một câu hỏi hay! Tôi sẽ cố gắng trả lời tốt nhất có thể. Bạn có thể cung cấp thêm chi tiết để tôi hỗ trợ chính xác hơn không? 🤔",
        "Cảm ơn bạn đã hỏi. Tôi hiểu bạn muốn biết về điều này. Bạn có thể liên hệ với tư vấn viên để được hỗ trợ chi tiết hơn. 📞",
      ],
    }

    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("chào") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    } else if (
      lowerMessage.includes("khóa học") ||
      lowerMessage.includes("course") ||
      lowerMessage.includes("n5") ||
      lowerMessage.includes("n4") ||
      lowerMessage.includes("jlpt")
    ) {
      return responses.course[Math.floor(Math.random() * responses.course.length)]
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)]
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    }

    // Update current chat with new message
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              lastMessage: content.trim(),
              timestamp: new Date(),
            }
          : chat,
      ),
    )

    setInputValue("")
    setIsLoading(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isTyping: true,
    }

    setChatSessions((prev) =>
      prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, typingMessage] } : chat)),
    )

    try {
      const aiResponse = await generateAIResponse(content)

      // Remove typing indicator and add real response
      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages
                  .filter((msg) => msg.id !== "typing")
                  .concat({
                    id: Date.now().toString(),
                    content: aiResponse,
                    role: "assistant",
                    timestamp: new Date(),
                  }),
                lastMessage: aiResponse.slice(0, 50) + "...",
                timestamp: new Date(),
              }
            : chat,
        ),
      )
    } catch (error) {
      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages
                  .filter((msg) => msg.id !== "typing")
                  .concat({
                    id: Date.now().toString(),
                    content: "Xin lỗi, tôi gặp sự cố kỹ thuật. Vui lòng thử lại sau. 😅",
                    role: "assistant",
                    timestamp: new Date(),
                  }),
              }
            : chat,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "Cuộc trò chuyện mới",
      lastMessage: "Bắt đầu cuộc trò chuyện...",
      timestamp: new Date(),
      messages: [initialMessage],
    }
    setChatSessions((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }

  const deleteChat = (chatId: string) => {
    setChatSessions((prev) => prev.filter((chat) => chat.id !== chatId))
    if (currentChatId === chatId) {
      const remainingChats = chatSessions.filter((chat) => chat.id !== chatId)
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id)
      } else {
        createNewChat()
      }
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Vừa xong"
    if (minutes < 60) return `${minutes} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    if (days < 7) return `${days} ngày trước`
    return date.toLocaleDateString("vi-VN")
  }

  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 border-r border-gray-200 flex flex-col overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Lịch sử chat</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={createNewChat} className="w-full bg-red-600 hover:bg-red-700 text-white mb-3">
            <Plus className="h-4 w-4 mr-2" />
            Tạo đoạn chat mới
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
        </div>

        {/* Chat Sessions List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChatSessions.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer mb-2 group hover:bg-gray-50 transition-colors ${
                  currentChatId === chat.id ? "bg-red-50 border border-red-200" : ""
                }`}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <h3 className="text-sm font-medium text-gray-900 truncate">{chat.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 truncate mb-1">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-400">{formatTime(chat.timestamp)}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    {/* <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteChat(chat.id)
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent> */}
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Đang hoạt động</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">🇯🇵 Tiếng Nhật</Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 max-w-4xl mx-auto">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.role === "user" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                        <span className="text-sm text-red-600">Đang trả lời...</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn của bạn..."
                  disabled={isLoading}
                  className="pr-12 py-3 rounded-2xl border-gray-300 focus:border-red-400 focus:ring-red-400"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 rounded-full h-8 w-8 p-0"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI có thể mắc lỗi. Vui lòng kiểm tra thông tin quan trọng.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
