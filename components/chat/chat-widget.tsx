"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { useToast } from "@/hooks/use-toast"
import { chat, type ChatMessage } from "@/lib/adapters/ai-adapter"
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Calendar,
  Package,
  CreditCard,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface ChatWidgetProps {
  className?: string
}

type ChatMode = "quick" | "scope"

interface UserInfo {
  name?: string
  email?: string
  company?: string
}

export function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<ChatMode>("quick")
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [showUserForm, setShowUserForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { openDialog } = useBookingDialog()
  const { toast } = useToast()

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat-messages")
    const savedUserInfo = localStorage.getItem("chat-user-info")

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (error) {
        console.error("Error loading chat messages:", error)
      }
    }

    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo))
      } catch (error) {
        console.error("Error loading user info:", error)
      }
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Save user info to localStorage
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      localStorage.setItem("chat-user-info", JSON.stringify(userInfo))
    }
  }, [userInfo])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm here to help with questions about Spider Fang's web services. What would you like to know?",
        },
      ])
    }
  }, [isOpen, messages.length])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: "user",
      content: inputValue.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await chat([...messages, userMessage], {
        mode,
        userInfo,
      })

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      toast({
        title: "Chat Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "book":
        openDialog()
        break
      case "packages":
        window.location.href = "/services"
        break
      case "pricing":
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
        break
      default:
        break
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem("chat-messages")
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you today?",
      },
    ])
  }

  const handleUserInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUserInfo = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
    }
    setUserInfo(newUserInfo)
    setShowUserForm(false)
    toast({
      title: "Information Saved",
      description: "Thanks! This helps me provide more personalized assistance.",
    })
  }

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 animate-pulse rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card
        className={`border-red-900/20 bg-black shadow-2xl transition-all duration-300 ${
          isMinimized ? "h-16 w-80" : "h-96 w-80"
        }`}
      >
        <CardHeader className="border-b border-red-900/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Spider Fang AI</h3>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={mode === "quick" ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${
                      mode === "quick" ? "bg-red-600 text-white" : "border-red-600 text-red-400"
                    }`}
                    onClick={() => setMode("quick")}
                  >
                    Quick Q&A
                  </Badge>
                  <Badge
                    variant={mode === "scope" ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${
                      mode === "scope" ? "bg-red-600 text-white" : "border-red-600 text-red-400"
                    }`}
                    onClick={() => setMode("scope")}
                  >
                    Scope Project
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-gray-400 hover:text-white"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex h-80 flex-col p-0">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      message.role === "user"
                        ? "bg-red-600 text-white"
                        : "border border-gray-700 bg-gray-800 text-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && (
                        <Bot className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      )}
                      {message.role === "user" && <User className="mt-0.5 h-4 w-4 flex-shrink-0" />}
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm text-gray-200">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-red-400" />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-red-400"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-red-400"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-800 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600/50 bg-transparent text-xs text-red-400 hover:bg-red-600/10"
                  onClick={() => handleQuickAction("book")}
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  Book Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600/50 bg-transparent text-xs text-red-400 hover:bg-red-600/10"
                  onClick={() => handleQuickAction("packages")}
                >
                  <Package className="mr-1 h-3 w-3" />
                  Packages
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600/50 bg-transparent text-xs text-red-400 hover:bg-red-600/10"
                  onClick={() => handleQuickAction("pricing")}
                >
                  <CreditCard className="mr-1 h-3 w-3" />
                  Pricing
                </Button>
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="border-gray-700 bg-gray-900 text-sm text-white"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-red-600 px-3 text-white hover:bg-red-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info Prompt */}
              {!userInfo.name && messages.length > 2 && (
                <div className="mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-red-600/50 bg-transparent text-xs text-red-400 hover:bg-red-600/10"
                    onClick={() => setShowUserForm(true)}
                  >
                    Share your details for better help
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* User Info Form Modal */}
      {showUserForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="mx-4 w-80 border-red-900/20 bg-black">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Help us help you better</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserForm(false)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Name</label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Company (optional)</label>
                  <Input
                    name="company"
                    placeholder="Your company"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-700 bg-transparent text-gray-300 hover:border-red-600 hover:text-red-400"
                    onClick={() => setShowUserForm(false)}
                  >
                    Skip
                  </Button>
                  <Button type="submit" className="flex-1 bg-red-600 text-white hover:bg-red-700">
                    Save
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
