"use client"

import { useState } from "react"

interface Comment {
  id: string
  text: string
  createdAt: string
}

interface Props {
  comments: Comment[]
  onAddComment: (text: string) => void
  onClose: () => void
}

export default function CommentModal({ comments, onAddComment, onClose }: Props) {
  const [text, setText] = useState("")

  const handleAdd = () => {
    if (!text.trim()) return
    onAddComment(text.trim())
    setText("")
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Comments</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="comments-list">
          {comments.map(c => (
            <div key={c.id} className="comment-item">
              {c.text} <br />
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>

        <div className="comments-input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add comment..."
          />
          <button onClick={handleAdd}>Add comment</button>
        </div>
      </div>
    </div>
  )
}
