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
import { busRequestOpen, messageOpen } from "@/actions/contact/set"
import { Eye } from "lucide-react"
import { getBus } from "@/actions/bus/get"


export default function Page() {
  const [busRequest, setBusRequest] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await getBus()
      if (res.status === 200) {
        setBusRequest(res.data.messages) // ✅ Corrigé: "restaurants" -> "messages"
      }
    }
    fetchData()
  }, [])

  // async function handleOpenBusRequest(id: string) {
  //   const res = await busRequestOpen(id)
  //   if (res.status === 200) {
  //     // mettre à jour localement l'état
  //     setBusRequest((prev) =>
  //       prev.map((m) =>
  //         m.id === id ? { ...m, viewed: true } : m
  //       )
  //     )
  //   }
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Bus Request</h1>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date de creation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {busRequest.map((msg) => (
              <TableRow
                key={msg.id}
                className="bg-green-50"
              // {
              //   msg.viewed
              //     ? "bg-green-50" // ✅ message vu
              //     : "bg-red-50" // ❌ message non vu
              // }
              >
                <TableCell>{msg.name}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{msg.hotel}</TableCell>
                <TableCell>
                  {new Date(msg.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {msg.time ? new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                </TableCell>
                <TableCell>
                  {new Date(msg.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}