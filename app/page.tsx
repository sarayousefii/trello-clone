"use client"

import { useBoard } from "../hooks/useBoard"
import SortableList from "../components/SortableList"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core"
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable"
import { useState } from "react"

export default function Home() {
  const {
    board,
    addList,
    deleteList,
    updateListTitle,
    updateListsOrder,
    addCard,
    updateCardTitle,
    deleteCard,
    addComment,
    clearCards,
    updateBoardTitle
  } = useBoard()

  const sensors = useSensors(useSensor(PointerSensor))

  const [openMenuListId, setOpenMenuListId] =
    useState<string | null>(null)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    // ---------------------------
    // Drag لیست‌ها
    // ---------------------------
    const isListDrag = board.lists.some(l => l.id === activeId)

    if (isListDrag) {
      const oldIndex = board.lists.findIndex(
        l => l.id === activeId
      )
      const newIndex = board.lists.findIndex(
        l => l.id === overId
      )

      if (oldIndex !== newIndex) {
        updateListsOrder(
          arrayMove(board.lists, oldIndex, newIndex)
        )
      }
      return
    }

    // ---------------------------
    // Drag کارت‌ها
    // ---------------------------
    let sourceListId: string | null = null
    let targetListId: string | null = null

    board.lists.forEach(list => {
      if (list.cards.some(c => c.id === activeId)) {
        sourceListId = list.id
      }
      if (list.cards.some(c => c.id === overId)) {
        targetListId = list.id
      }
    })

    // اگر روی خود لیست دراپ شده
    if (!targetListId) {
      const isDroppedOnList = board.lists.some(
        l => l.id === overId
      )
      if (isDroppedOnList) {
        targetListId = overId
      }
    }

    if (!sourceListId || !targetListId) return

    // ---------------------------
    // داخل همان لیست (reorder)
    // ---------------------------
    if (sourceListId === targetListId) {
      const list = board.lists.find(
        l => l.id === sourceListId
      )!

      const oldIndex = list.cards.findIndex(
        c => c.id === activeId
      )
      const newIndex = list.cards.findIndex(
        c => c.id === overId
      )

      if (oldIndex === -1 || newIndex === -1) return

      const newCards = arrayMove(
        list.cards,
        oldIndex,
        newIndex
      )

      updateListsOrder(
        board.lists.map(l =>
          l.id === sourceListId
            ? { ...l, cards: newCards }
            : l
        )
      )
    } else {
      // ---------------------------
      // انتقال بین دو لیست
      // ---------------------------
      const sourceList = board.lists.find(
        l => l.id === sourceListId
      )!
      const targetList = board.lists.find(
        l => l.id === targetListId
      )!

      const movingCard = sourceList.cards.find(
        c => c.id === activeId
      )!

      const newSourceCards =
        sourceList.cards.filter(
          c => c.id !== activeId
        )

      const newTargetCards = [...targetList.cards]

      const overIndex = newTargetCards.findIndex(
        c => c.id === overId
      )

      if (overIndex >= 0) {
        newTargetCards.splice(
          overIndex,
          0,
          movingCard
        )
      } else {
        newTargetCards.push(movingCard)
      }

      updateListsOrder(
        board.lists.map(l => {
          if (l.id === sourceListId)
            return { ...l, cards: newSourceCards }

          if (l.id === targetListId)
            return { ...l, cards: newTargetCards }

          return l
        })
      )
    }
  }

  return (
    <div className="container">
      <h3>
        <input
          type="text"
          value={board.title}
          onChange={(e) =>
            updateBoardTitle(e.target.value)
          }
          className="board-title-input"
        />
      </h3>

      <button
        className="add-list-btn"
        onClick={() => addList("New List")}
      >
        + Add another list
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={board.lists.map(l => l.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="lists-container">
            {board.lists.map(list => (
              <SortableList
                key={list.id}
                list={list}
                openMenuListId={openMenuListId}
                setOpenMenuListId={
                  setOpenMenuListId
                }
                onDelete={deleteList}
                onUpdateTitle={updateListTitle}
                onAddCard={addCard}
                onUpdateCard={updateCardTitle}
                onDeleteCard={deleteCard}
                onAddComment={addComment}
                clearCards={clearCards}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
