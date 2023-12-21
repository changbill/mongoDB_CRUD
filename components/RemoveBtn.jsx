"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { HiOutlineTrash } from "react-icons/hi"

export default function RemoveBtn({ id, title }) {
  const router = useRouter()
  const removeTopic = async () => {
    const confirmed = confirm(`Are you sure to delete ${title}?`)
    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        router.refresh()
      }
    }
  }
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  )
}
