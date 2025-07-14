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
  Settings,
  Menu,
  X,
  Edit3,
  Check,
  XCircle,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { API_URL_AI } from "@/utils/URLMapping"
import { useAPI } from "@/hooks"

interface Message {
  id: number
  content: string
  type: "human" | "ai"
  timestamp: Date
  isTyping?: boolean
  isEditing?: boolean
}

interface ChatSession {
  id: number
  session_name: string
  updated_at: string
  messages: Message[]
}

export default function ChatbotLocalhost() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentChatId, setCurrentChatId] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null)
  const [editingSessionName, setEditingSessionName] = useState("")
  const [error, setError] = useState<string>("")
  const { API } = useAPI()
  const [currentMessages, setCurrentMessages] = useState<any[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentChat = chatSessions.find((chat) => chat.id === currentChatId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    console.log(currentMessages, chatSessions)
  }, [currentMessages])

  useEffect(() => {
    setCurrentMessages(currentChat?.messages || [])
  }, [currentChat])

  // Load chat sessions on component mount
  useEffect(() => {
    loadChatSessions()
  }, [])

  const loadChatSessions = async () => {
    setError("")
    try {
      const response = await API.get(`/sessions/user/than`, API_URL_AI)
      if (response.success && response.sessions) {
        const sessions = response.sessions.map((session: any) => ({
          ...session,
          messages: [],
        }))
        setChatSessions(sessions)
        if (sessions.length > 0) {
          setCurrentChatId(sessions[0].id)
          loadChatMessages(sessions[0].id)
        }
      } else {
        setError("Không thể tải danh sách chat")
      }
    } catch (error) {
      setError("Lỗi kết nối đến server")
      console.error("Error loading chat sessions:", error)
    }
  }

  const loadChatMessages = async (sessionId: number) => {
    try {
      const response = await API.get(`/sessions/${sessionId}/history`, API_URL_AI)
      if (response.success && response.messages) {
        const messages = response.messages.map((msg: any, index: number) => ({
          id: `${sessionId}-${index}`,
          content: msg.content,
          type: msg.type,
          timestamp: new Date(),
        }))
        setChatSessions((prev) => prev.map((chat) => (chat.id === sessionId ? { ...chat, messages } : chat)))
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    }
    setCurrentChatId(sessionId)
  }

  const createNewChat = async () => {
    setError("")
    try {
      const payload = {
        user_id: "than",
        session_name: "Cuộc trò chuyện mới",
      }
      const response = await API.post("sessions/", payload, API_URL_AI)

      if (response.success) {
        await loadChatSessions()
      } else {
        setError("Không thể tạo chat mới")
      }
    } catch (error) {
      setError("Lỗi khi tạo chat mới")
      console.error("Error creating new chat:", error)
    }
  }

  const deleteChat = async (sessionId: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa cuộc trò chuyện này?");
    if (!confirmDelete) return;

    setError("");
    try {
      await API.delete(`sessions/${sessionId}`, sessionId, API_URL_AI); // không kiểm tra response.success
      window.location.reload(); // ✅ đơn giản và hiệu quả
    } catch (error) {
      setError("Lỗi khi xóa chat");
      console.error("Error deleting chat:", error);
    }
  };

  const handleEditSessionName = async (sessionId: number, newName: string) => {
    if (!newName.trim()) return

    try {
      const response = await API.put(`sessions/${sessionId}/rename`, { new_name: newName.trim() }, API_URL_AI)
      if (response.success) {
        loadChatMessages(sessionId);
        setChatSessions((prev) =>
          prev.map((chat) => (chat.id === sessionId ? { ...chat, session_name: response.session_name } : chat)),
        )
        setEditingSessionId(null)
        setEditingSessionName(response.session_name)
      } else {
        setError("Không thể cập nhật tên session")
      }
    } catch (error) {
      setError("Lỗi khi cập nhật tên session")
      console.error("Error updating session name:", error)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !currentChatId) return

    const userMessage: Message = {
      id: currentChatId,
      content: content.trim(),
      type: "human",
      timestamp: new Date(),
    }

    // Add user message to current chat
    setChatSessions((prev) =>
      prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat)),
    )

    setInputValue("")
    setIsLoading(true)
    setError("")

    // Add typing indicator
    const typingMessage: Message = {
      id: -1,
      content: "",
      type: "ai",
      timestamp: new Date(),
      isTyping: true,
    }

    setChatSessions((prev) =>
      prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, typingMessage] } : chat)),
    )

    try {
      const payload = {
        session_id: currentChatId + "",
        user_input: content.trim(),
      }

      const response = await API.post("/chat/invoke", payload, API_URL_AI)

      if (response.success) {
        const aiMessage: Message = {
          id: response.session_id,
          content: response.ai_response,
          type: "ai",
          timestamp: new Date(),
        }

        // Remove typing indicator and add AI response
        setChatSessions((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? {
                ...chat,
                messages: chat.messages.filter((message) => message.id != -1).concat(aiMessage),
              }
              : chat,
          ),
        )
      } else {
        throw new Error(response.error || "API call failed")
      }
    } catch (error) {
      setError("Lỗi khi gửi tin nhắn")
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: currentChatId,
        content: "Xin lỗi, tôi gặp sự cố kỹ thuật. Vui lòng thử lại sau. 😅",
        type: "ai",
        timestamp: new Date(),
      }

      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
              ...chat,
              messages: chat.messages.filter((message) => message.id != -1).concat(errorMessage),
            }
            : chat,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditAndResubmit = async (newContent: string) => {
    if (!currentChatId || !newContent.trim()) return

    setIsLoading(true)
    setError("")

    try {
      const payload = {
        session_id: currentChatId,
        corrected_input: newContent.trim(),
      }

      const response = await API.post("/chat/edit_and_resubmit", payload, API_URL_AI)

      if (response.success) {
        // Reload messages to get updated conversation
        await loadChatMessages(currentChatId)
      } else {
        setError("Không thể chỉnh sửa và gửi lại tin nhắn")
      }
    } catch (error) {
      setError("Lỗi khi chỉnh sửa tin nhắn")
      console.error("Error editing and resubmitting:", error)
    } finally {
      setIsLoading(false)
      setEditingMessageId(null)
      setEditingContent("")
    }
  }

  const handleEditMessage = (messageId: number, content: string) => {
    // Chỉ cho phép edit tin nhắn cuối cùng của human
    const humanMessages = currentMessages.filter((msg) => msg.type === "human")
    const lastHumanMessage = humanMessages[humanMessages.length - 1]

    if (messageId === lastHumanMessage?.id) {
      setEditingMessageId(messageId)
      setEditingContent(content)
    }
  }

  const handleSaveEdit = async () => {
    if (!editingMessageId || !currentChatId) return

    // Check if this is the last human message
    const humanMessages = currentMessages.filter((msg) => msg.type === "human")
    const lastHumanMessage = humanMessages[humanMessages.length - 1]

    if (editingMessageId === lastHumanMessage?.id) {
      // Use edit_and_resubmit API for the last message
      await handleEditAndResubmit(editingContent)
    } else {
      // For other messages, just update locally
      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === editingMessageId ? { ...msg, content: editingContent } : msg,
              ),
            }
            : chat,
        ),
      )
      setEditingMessageId(null)
      setEditingContent("")
    }
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditingContent("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
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
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-white flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 border-r border-gray-200 flex flex-col overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Trợ lý AI</h1>
                </div>
              </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={createNewChat} className="w-full bg-red-600 hover:bg-red-700 text-white mb-3">
            <Plus className="h-4 w-4 mr-2" />
            Tạo đoạn chat mới
          </Button>
          <Button onClick={loadChatSessions} variant="outline" size="sm" className="w-full bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </div>

        {/* Chat Sessions List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chatSessions.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer mb-2 group hover:bg-gray-50 transition-colors ${currentChatId === chat.id ? "bg-red-50 border border-red-200" : ""
                  }`}
                onClick={() => {
                  if (editingSessionId !== chat.id) {
                    loadChatMessages(chat.id)
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      {editingSessionId === chat.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingSessionName}
                            onChange={(e) => setEditingSessionName(e.target.value)}
                            className="text-sm h-6 flex-1"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleEditSessionName(chat.id, editingSessionName)
                              }
                              if (e.key === "Escape") {
                                setEditingSessionId(null)
                                setEditingSessionName("")
                              }
                            }}
                            onBlur={() => setEditingSessionId(null)}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditSessionName(chat.id, editingSessionName)
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <h3 className="text-sm font-medium text-gray-900 truncate">{chat.session_name}</h3>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{formatTime(new Date(chat.updated_at))}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingSessionId(chat.id)
                          setEditingSessionName(chat.session_name)
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Sửa tên
                      </DropdownMenuItem>
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
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">🇯🇵 Tiếng Nhật</Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 flex-shrink-0">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 max-w-4xl mx-auto">
              {currentMessages.map((message, index) => {
                const lastHumanIndex =
                  currentMessages.length -
                  1 -
                  currentMessages
                    .slice()
                    .reverse()
                    .findIndex((m) => m.type === "human")
                const isLastHumanMessage = message.type === "human" && index === lastHumanIndex

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "human" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 group relative ${message.type === "human" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                          <span className="text-sm text-red-600">Đang trả lời...</span>
                        </div>
                      ) : editingMessageId === message.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="min-h-[60px] max-h-[600px] text-sm text-black"
                            placeholder="Chỉnh sửa tin nhắn..."
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveEdit} disabled={isLoading}>
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              Lưu & Gửi lại
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                              <XCircle className="h-3 w-3 mr-1" />
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {message.type === "human" && isLastHumanMessage && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                onClick={() => handleEditMessage(message.id, message.content)}
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {message.type === "human" && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập tin nhắn của bạn..."
                  disabled={isLoading || !currentChatId}
                  className="pr-12 py-3 rounded-2xl border-gray-300 focus:border-red-400 focus:ring-red-400"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading || !currentChatId}
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
