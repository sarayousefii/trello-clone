// services/initialData.ts
import { Board } from "../types/board.types"

const initialData: Board = {
  id: "board-1",
  title: "Demo Board",
  lists: [
    {
      id: "list-1",
      title: "To Do",
      cards: [
        { id: "card-1", title: "Sample Card", comments: [] }
      ]
    }
  ]
}

export default initialData
