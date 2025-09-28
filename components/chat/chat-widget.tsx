"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, User, Bot, Calendar, Package, CreditCard, Minimize2, Maximize2 } from "lucide-react"
import { chat, type ChatMessage } from "@/lib/adapters/ai-adapter"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { useToast } from "@/hooks/use-toast"

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
          content: "Hi! I'm here to help with questions about Spider Fang's web services. What would you like to know?",
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
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card
        className={`bg-black border-red-900/20 shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-80 h-96"
        }`}
      >
        <CardHeader className="p-4 border-b border-red-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Spider Fang AI</h3>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={mode === "quick" ? "default" : "outline"}
                    className={`text-xs cursor-pointer ${
                      mode === "quick" ? "bg-red-600 text-white" : "border-red-600 text-red-400"
                    }`}
                    onClick={() => setMode("quick")}
                  >
                    Quick Q&A
                  </Badge>
                  <Badge
                    variant={mode === "scope" ? "default" : "outline"}
                    className={`text-xs cursor-pointer ${
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
                className="text-gray-400 hover:text-white p-1"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-200 border border-gray-700"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      {message.role === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-200 border border-gray-700 p-3 rounded-lg text-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
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
            <div className="p-3 border-t border-gray-800">
              <div className="flex flex-wrap gap-2 mb-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent"
                  onClick={() => handleQuickAction("book")}
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Book Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent"
                  onClick={() => handleQuickAction("packages")}
                >
                  <Package className="w-3 h-3 mr-1" />
                  Packages
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent"
                  onClick={() => handleQuickAction("pricing")}
                >
                  <CreditCard className="w-3 h-3 mr-1" />
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
                  className="bg-gray-900 border-gray-700 text-white text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* User Info Prompt */}
              {!userInfo.name && messages.length > 2 && (
                <div className="mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent w-full"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-black border-red-900/20 w-80 mx-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Help us help you better</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserForm(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Name</label>
                  <Input name="name" placeholder="Your name" className="bg-gray-900 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Company (optional)</label>
                  <Input name="company" placeholder="Your company" className="bg-gray-900 border-gray-700 text-white" />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:border-red-600 hover:text-red-400 bg-transparent"
                    onClick={() => setShowUserForm(false)}
                  >
                    Skip
                  </Button>
                  <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
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
