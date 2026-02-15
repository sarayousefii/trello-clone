"use client"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Card from "./Card"
import { List as ListType } from "../types/board.types"

interface Props {
  list: ListType
  onDelete: (id: string) => void
  onAddCard: (listId: string, title: string) => void
  onUpdateCard: (listId: string, cardId: string, title: string) => void
  onDeleteCard: (listId: string, cardId: string) => void
  onAddComment: (listId: string, cardId: string, text: string) => void
}

export default function List({
  list,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onAddComment
}: Props) {
  return (
    <div className="list-container">
      <button
        className="add-card-btn"
        onClick={() => onAddCard(list.id, "New Card")}
      >
        + Add another card
      </button>

      
      <SortableContext
        items={list.cards.map(card => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {list.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            listId={list.id}
            onDeleteCard={onDeleteCard}
            onUpdateCard={onUpdateCard}
            onAddComment={onAddComment}
          />
        ))}
      </SortableContext>
    </div>
  )
}
