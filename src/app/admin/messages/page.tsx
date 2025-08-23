"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { getContactMessages } from "@/actions/contact/get"
import { messageOpen } from "@/actions/contact/set"

type Message = {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  viewed: boolean
  is_read: boolean
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await getContactMessages()
      if (res.status === 200) {
        setMessages(res.data.messages) // ✅ Corrigé: "restaurants" -> "messages"
      }
    }
    fetchData()
  }, [])

  async function handleOpenMessage(id: string) {
    const res = await messageOpen(id)
    if (res.status === 200) {
      // mettre à jour localement l'état
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, viewed: true } : m
        )
      )
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Messages de contact</h1>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow
                key={msg.id}
                className={
                  msg.viewed
                    ? "bg-green-50" // ✅ message vu
                    : "bg-red-50" // ❌ message non vu
                }
              >
                <TableCell>{msg.name}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{msg.subject}</TableCell>
                <TableCell>
                  {new Date(msg.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog
                    onOpenChange={(open) => {
                      if (open && !msg.viewed) {
                        handleOpenMessage(msg.id)
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{msg.subject}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p>
                          <strong>Nom :</strong> {msg.name}
                        </p>
                        <p>
                          <strong>Email :</strong> {msg.email}
                        </p>
                        {msg.phone && (
                          <p>
                            <strong>Téléphone :</strong> {msg.phone}
                          </p>
                        )}
                        <p>
                          <strong>Message :</strong>
                        </p>
                        <p className="p-2 border rounded-md bg-gray-50">
                          {msg.message}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}