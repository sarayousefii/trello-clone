"use client"
import { useState, useEffect } from "react"
import { Board } from "../types/board.types"
import initialData from "../services/initialData"

export function useBoard() {
  const [board, setBoard] = useState<Board>(initialData)

  useEffect(() => {
    const saved = localStorage.getItem("board")
    if (saved) setBoard(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board))
  }, [board])

  const addList = (title: string) => {
    setBoard(prev => ({
      ...prev,
      lists: [...prev.lists, { id: crypto.randomUUID(), title, cards: [] }]
    }))
  }

  const deleteList = (listId: string) => {
    setBoard(prev => ({
      ...prev,
      lists: prev.lists.filter(l => l.id !== listId)
    }))
  }

  const updateListTitle = (listId: string, title: string) => {
    setBoard(prev => ({
      ...prev,
      lists: prev.lists.map(l =>
        l.id === listId ? { ...l, title } : l
      )
    }))
  }

  const updateListsOrder = (newLists: typeof board.lists) => {
    setBoard(prev => ({ ...prev, lists: newLists }))
  }

  const addCard = (listId: string, title: string) => {
    setBoard(prev => ({
      ...prev,
      lists: prev.lists.map(l =>
        l.id === listId
          ? {
              ...l,
              cards: [...l.cards, { id: crypto.randomUUID(), title, comments: [] }]
            }
          : l
      )
    }))
  }

  const updateCardTitle = (listId: string, cardId: string, title: string) => {
    setBoard(prev => ({
      ...prev,
      lists: prev.lists.map(l =>
        l.id === listId
          ? {
              ...l,
              cards: l.cards.map(c =>
                c.id === cardId ? { ...c, title } : c
              )
            }
          : l
      )
    }))
  }

  const deleteCard = (listId: string, cardId: string) => {
    setBoard(prev => ({
      ...prev,
      lists: prev.lists.map(l =>
        l.id === listId
          ? { ...l, cards: l.cards.filter(c => c.id !== cardId) }
          : l
      )
    }))
  }

  const addComment = (listId: string, cardId: string, text: string) => {
    setBoard(prev => ({
      ...prev,
      lists: prev.lists.map(l =>
        l.id === listId
          ? {
              ...l,
              cards: l.cards.map(c =>
                c.id === cardId
                  ? {
                      ...c,
                      comments: [
                        ...c.comments,
                        {
                          id: crypto.randomUUID(),
                          text,
                          createdAt: new Date().toISOString()
                        }
                      ]
                    }
                  : c
              )
            }
          : l
      )
    }))
  }

  // 🔥 move card between lists
  const moveCard = (activeId: string, overId: string) => {
    setBoard(prev => {
      let sourceListIndex = -1
      let targetListIndex = -1
      let sourceCardIndex = -1
      let targetCardIndex = -1

      prev.lists.forEach((list, listIndex) => {
        list.cards.forEach((card, cardIndex) => {
          if (card.id === activeId) {
            sourceListIndex = listIndex
            sourceCardIndex = cardIndex
          }
          if (card.id === overId) {
            targetListIndex = listIndex
            targetCardIndex = cardIndex
          }
        })
      })

      if (sourceListIndex === -1 || targetListIndex === -1) return prev

      const newLists = [...prev.lists]

      const movingCard =
        prev.lists[sourceListIndex].cards[sourceCardIndex]

      // remove from source
      newLists[sourceListIndex] = {
        ...newLists[sourceListIndex],
        cards: newLists[sourceListIndex].cards.filter(
          c => c.id !== activeId
        )
      }

      // insert into target
      const targetCards = [...newLists[targetListIndex].cards]
      targetCards.splice(targetCardIndex, 0, movingCard)

      newLists[targetListIndex] = {
        ...newLists[targetListIndex],
        cards: targetCards
      }

      return { ...prev, lists: newLists }
    })
  }

  const clearCards = (listId: string) => {
    setBoard(prev => ({
        ...prev,
        lists: prev.lists.map(l =>
        l.id === listId ? { ...l, cards: [] } : l
        )
    }))
  }

  const updateBoardTitle = (title: string) => {
    setBoard(prev => ({
      ...prev,
      title
    }))
  }

  return {
    board,
    addList,
    deleteList,
    updateListTitle,
    updateBoardTitle,
    updateListsOrder,
    addCard,
    updateCardTitle,
    deleteCard,
    addComment,
    moveCard,
    clearCards
  }
}
