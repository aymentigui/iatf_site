"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { getBusRequest, getContactMessages } from "@/actions/contact/get"
import { busRequestOpen, messageOpen } from "@/actions/contact/set"
import { Eye } from "lucide-react"



export default function MessagesPage() {
  const [busRequest, setBusRequest] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await getBusRequest()
      if (res.status === 200) {
        setBusRequest(res.data.messages) // ✅ Corrigé: "restaurants" -> "messages"
      }
    }
    fetchData()
  }, [])

  async function handleOpenBusRequest(id: string) {
    const res = await busRequestOpen(id)
    if (res.status === 200) {
      // mettre à jour localement l'état
      setBusRequest((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, viewed: true } : m
        )
      )
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Bus Request</h1>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Urgence</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {busRequest.map((msg) => (
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
                <TableCell>{msg.urgence}</TableCell>
                <TableCell>{msg.hotel}</TableCell>
                <TableCell>{msg.country}</TableCell>
                <TableCell>
                  {new Date(msg.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button className="border rounded-lg" onClick={()=>handleOpenBusRequest(msg.id)}>marqué vu</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}