"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Message } from "../lib/types"

interface MessageFormProps {
  onSubmit: (content: string) => void
  editingMessage: Message | null
  onCancel: () => void
}

export default function MessageForm({ onSubmit, editingMessage, onCancel }: MessageFormProps) {
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)
  const MAX_CHARS = 500

  // Update form when editing message changes
  useEffect(() => {
    if (editingMessage) {
      setContent(editingMessage.content)
      setCharCount(editingMessage.content.length)
    } else {
      setContent("")
      setCharCount(0)
    }
  }, [editingMessage])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    setCharCount(newContent.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate content
    if (!content.trim()) {
      setError("Please enter a message")
      return
    }

    if (content.length > MAX_CHARS) {
      setError(`Message is too long (maximum ${MAX_CHARS} characters)`)
      return
    }

    // Clear any previous errors
    setError(null)

    // Submit the message
    onSubmit(content)

    // Clear the form only if not editing
    if (!editingMessage) {
      setContent("")
      setCharCount(0)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{editingMessage ? "Edit Message" : "Share Your Thoughts"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write your message here..."
            value={content}
            onChange={handleContentChange}
            className="min-h-[120px] resize-none"
            aria-label="Message content"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className={`text-xs mt-2 ${charCount > MAX_CHARS ? "text-red-500" : "text-muted-foreground"}`}>
            {charCount}/{MAX_CHARS} characters
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {editingMessage && (
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">{editingMessage ? "Update" : "Submit"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
