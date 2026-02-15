"use client"

import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Card from "./Card"
import { List as ListType } from "../types/board.types"

interface Props {
  list: ListType
  openMenuListId: string | null
  setOpenMenuListId: (id: string | null) => void
  onDelete: (id: string) => void
  onUpdateTitle: (id: string, title: string) => void
  onAddCard: (listId: string, title: string) => void
  onUpdateCard: (listId: string, cardId: string, title: string) => void
  onDeleteCard: (listId: string, cardId: string) => void
  onAddComment: (listId: string, cardId: string, text: string) => void
  clearCards: (listId: string) => void
}

export default function SortableList({
  list,
  openMenuListId,
  setOpenMenuListId,
  ...props
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: list.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const isMenuOpen = openMenuListId === list.id

  return (
    <div ref={setNodeRef} style={style} className="sortable-list">
      <div className="list-header">
        <div className="list-header-left">
          {/* فقط این div برای drag handle */}
          <div {...attributes} {...listeners} className="drag-handle">
            ⋮⋮⋮
          </div>

          {/* عنوان لیست بدون drag */}
          <input
            value={list.title}
            onChange={e => props.onUpdateTitle(list.id, e.target.value)}
            className="list-title"
          />
        </div>

        <div className="menu-container">
          <button
            className="menu-btn"
            onClick={() => setOpenMenuListId(isMenuOpen ? null : list.id)}
          >
            ⋯
          </button>

          {isMenuOpen && (
            <div className="menu-dropdown">
              <button onClick={() => props.onDelete(list.id)}>
                Delete List
              </button>
              <button onClick={() => props.clearCards(list.id)}>
                Clear Cards
              </button>
            </div>
          )}
        </div>
      </div>

      <SortableContext
        items={list.cards.map(c => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="list-container">
          {list.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              listId={list.id}
              onUpdateCard={props.onUpdateCard}
              onDeleteCard={props.onDeleteCard}
              onAddComment={props.onAddComment}
            />
          ))}

          <button
            className="add-card-btn"
            onClick={() => props.onAddCard(list.id, "New Card")}
          >
            + Add another Card
          </button>
        </div>
      </SortableContext>
    </div>
  )
}
