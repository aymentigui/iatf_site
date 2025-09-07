"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Eye, Search, Filter, X } from "lucide-react"
import { getBus } from "@/actions/bus/get"
import { Label } from "@/components/ui/label"

export default function Page() {
  const [busRequest, setBusRequest] = useState<any[]>([])
  const [filteredRequests, setFilteredRequests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    async function fetchData() {
      const res = await getBus()
      if (res.status === 200) {
        setBusRequest(res.data.messages)
        setFilteredRequests(res.data.messages)
      }
    }
    fetchData()
  }, [])

  // Appliquer les filtres
  useEffect(() => {
    let results = busRequest
    
    // Filtre par recherche d'hôtel
    if (searchTerm) {
      results = results.filter(request => 
        request.hotel.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filtre par date
    if (dateFilter) {
      results = results.filter(request => {
        const requestDate = new Date(request.date)
        const filterDate = new Date(dateFilter)
        return (
          requestDate.getDate() === filterDate.getDate() &&
          requestDate.getMonth() === filterDate.getMonth() &&
          requestDate.getFullYear() === filterDate.getFullYear()
        )
      })
    }
    
    setFilteredRequests(results)
  }, [busRequest, searchTerm, dateFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setDateFilter("")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Demandes de Bus</h1>
      
      {/* Barre de filtres */}
      <Card className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Label htmlFor="search" className="mb-2 block">Rechercher par hôtel</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Nom de l'hôtel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <Label htmlFor="date" className="mb-2 block">Filtrer par date</Label>
            <Input
              id="date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full sm:w-[240px]"
            />
          </div>
          
          {(searchTerm || dateFilter) && (
            <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
              <X className="mr-2 h-4 w-4" />
              Effacer les filtres
            </Button>
          )}
        </div>
      </Card>
      
      {/* Résumé des filtres appliqués */}
      {(searchTerm || dateFilter) && (
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredRequests.length} résultat(s) trouvé(s)
          {searchTerm && ` pour "${searchTerm}"`}
          {searchTerm && dateFilter && ' et '}
          {dateFilter && ` pour le ${new Date(dateFilter).toLocaleDateString('fr-FR')}`}
        </div>
      )}
      
      <Card className="p-4">
        {filteredRequests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hôtel</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Heure</TableHead>
                <TableHead>Date de création</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((msg) => (
                <TableRow
                  key={msg.id}
                  className="bg-green-50"
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
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Aucune demande de bus ne correspond à vos critères de recherche.
          </div>
        )}
      </Card>
    </div>
  )
}