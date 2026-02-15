"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card as CardType } from "../types/board.types"
import { useState } from "react"
import CommentModal from "./CommentModal"

interface Props {
  card: CardType
  listId: string
  onUpdateCard: (listId: string, cardId: string, title: string) => void
  onDeleteCard: (listId: string, cardId: string) => void
  onAddComment: (listId: string, cardId: string, text: string) => void
}

export default function Card({
  card,
  listId,
  onUpdateCard,
  onDeleteCard,
  onAddComment
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const [showComments, setShowComments] = useState(false)

  return (
    <div ref={setNodeRef} style={style} className="card">
      <div className="card-header">
        <div {...attributes} {...listeners} className="drag-handle">
          ⋮⋮⋮
        </div>
        <input
          value={card.title}
          onChange={e =>
            onUpdateCard(listId, card.id, e.target.value)
          }
        />
      </div>

      <div className="card-buttons">
        <button onClick={() => onDeleteCard(listId, card.id)}>Delete</button>
        <button onClick={() => setShowComments(true)}>
          Comments ({card.comments.length})
        </button>
      </div>

      {showComments && (
        <CommentModal
          comments={card.comments}
          onAddComment={text => {
            onAddComment(listId, card.id, text)
            setShowComments(false)
          }}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  )
}
