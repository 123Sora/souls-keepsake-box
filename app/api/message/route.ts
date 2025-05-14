import { type NextRequest, NextResponse } from "next/server"
import type { Message } from "@/lib/types"

// GET /api/messages - Get all messages
export async function GET() {
  //will return a mock response
  return NextResponse.json({
    messages: [],
  })
}

// POST /api/messages - Create a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json({ error: "Content is required and must be a string" }, { status: 400 })
    }

    if (body.content.length > 500) {
      return NextResponse.json({ error: "Content must be less than 500 characters" }, { status: 400 })
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: body.content,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ message: newMessage }, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}

// PUT /api/messages/:id - Update a message
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json({ error: "Content is required and must be a string" }, { status: 400 })
    }

    if (body.content.length > 500) {
      return NextResponse.json({ error: "Content must be less than 500 characters" }, { status: 400 })
    }

    const updatedMessage: Message = {
      id: body.id,
      content: body.content,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ message: updatedMessage })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

// DELETE /api/messages/ - Delete a message (id)
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
