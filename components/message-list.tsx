"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Message } from "../lib/types"

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  onEdit: (message: Message) => void
  onDelete: (id: string) => void
}

export default function MessageList({ messages, isLoading, onEdit, onDelete }: MessageListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No messages yet. Be the first to share!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Messages ({messages.length})</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onEdit={() => onEdit(message)}
            onDelete={() => onDelete(message.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface MessageCardProps {
  message: Message
  onEdit: () => void
  onDelete: () => void
}

function MessageCard({ message, onEdit, onDelete }: MessageCardProps) {
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 pt-6">
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <span className="text-xs text-muted-foreground">
          {message.updatedAt ? "Updated " : ""}
          {timeAgo}
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit} aria-label="Edit message">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} aria-label="Delete message">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
