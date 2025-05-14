"use client"

import { formatDistanceToNow } from "date-fns"
import { Edit2, Trash2 } from "lucide-react"
import type { Message } from "../lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface MessageCardProps {
  message: Message
  onEdit: () => void
  onDelete: () => void
}

export function MessageCard({ message, onEdit, onDelete }: MessageCardProps) {
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
