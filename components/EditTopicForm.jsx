"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title) // 읽어온 값을 초기값으로 넣기 위함
  const [newDescription, setNewDescription] = useState(description)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error("Failed to update topic")
      }
      router.push("/")
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 p-4"
          type="text"
          placeholder="Topic Title"
        />
        <textarea
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="border border-slate-500 p-4 h-36"
          type="text"
          placeholder="Topic Description"
        />
        <button
          type="submit"
          className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md
        "
        >
          Update Topic
        </button>
      </form>
    </div>
  )
}
