"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MessageForm from "@/components/message-form"
import MessageList from "@/components/message-list"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { Message } from "../lib/types"

export default function MessageApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      setIsLoading(true)
      const storedMessages = localStorage.getItem("soul_keepsake_messages")

      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages)
        setMessages(parsedMessages)
      }
    } catch (error) {
      console.error("Failed to load messages:", error)
      showNotification("error", "Failed to load messages")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("soul_keepsake_messages", JSON.stringify(messages))
      } catch (error) {
        console.error("Failed to save messages:", error)
        showNotification("error", "Failed to save messages")
      }
    }
  }, [messages, isLoading])

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddMessage = (content: string) => {
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [newMessage, ...prev])
      showNotification("success", "Message added successfully")
    } catch (error) {
      console.error("Failed to add message:", error)
      showNotification("error", "Failed to add message")
    }
  }

  const handleUpdateMessage = (id: string, content: string) => {
    try {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? { ...message, content: content.trim(), updatedAt: new Date().toISOString() } : message,
        ),
      )
      setEditingMessage(null)
      showNotification("success", "Message updated successfully")
    } catch (error) {
      console.error("Failed to update message:", error)
      showNotification("error", "Failed to update message")
    }
  }

  const handleDeleteMessage = (id: string) => {
    try {
      setMessages((prev) => prev.filter((message) => message.id !== id))
      showNotification("success", "Message deleted successfully")
    } catch (error) {
      console.error("Failed to delete message:", error)
      showNotification("error", "Failed to delete message")
    }
  }

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message)
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {notification && (
          <Alert
            className={`mb-6 ${
              notification.type === "success"
                ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
              <AlertDescription>{notification.message}</AlertDescription>
            </div>
          </Alert>
        )}

        <MessageForm
          onSubmit={editingMessage ? (content) => handleUpdateMessage(editingMessage.id, content) : handleAddMessage}
          editingMessage={editingMessage}
          onCancel={handleCancelEdit}
        />

        <div className="h-8" />

        <MessageList
          messages={messages}
          isLoading={isLoading}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
        />
      </main>

      <Footer />
    </div>
  )
}
