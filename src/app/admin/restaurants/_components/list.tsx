"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast"
import { useImportSheetsStore } from "@/hooks/use-import-csv"
import { useTranslations } from "next-intl"
import { generateFileClient } from "@/actions/util/export-data/export-client"
import ExportButton from "@/components/my/export-button"
import { createRestaurants } from "@/actions/restaurant/set"
import { getRestos } from "@/actions/restaurant/get"
import { deleteResto } from "@/actions/restaurant/delete"
import { getColumns } from "@/actions/util/sheet-columns/resto"

export function List() {
  const translateSystem = useTranslations("System");
  const translateErrors = useTranslations("Error")

  const router = useRouter()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<any[]>([])
  const [sousGroups, setSousGroups] = useState<any[]>([])
  const [families, setFamilies] = useState<any[]>([])
  const [sousFamilies, setSousFamilies] = useState<any[]>([])
  const { data: sheetData, setColumns, setData: setSheetData } = useImportSheetsStore();
  const [sheetNotCreated, setSheetNotCreated] = useState<any>([])
  const [sheetCreated, setSheetCreated] = useState(false)

  const columnsSheet = getColumns()


  // pour la creation depuis les sheet
  useEffect(() => {
    if (sheetData && sheetData.length > 0) {
      createRestaurants(sheetData).then((res) => {
        if (res.status === 200) {
          if (res.data.restaurants) {
            res.data.restaurants.forEach((item) => {
              if (item.status !== 200) {
                setSheetNotCreated((prev: any) => [...prev, item.data])
              } else {
                setSheetCreated(true)
              }
            })
          }
        } else {
          toast.error(res.data.message);
        }
      }).catch((error) => {
        toast.error(translateSystem("errorcreate"));
      }).finally(() => {
        setSheetData([]); // Mettre à jour le tableau avec les données créées
      });
    }
  }, [sheetData]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0,
  })

  const [filters, setFilters] = useState<any>({
    search: "",
    statut: undefined,
    page: 1,
    limit: 25,
  })

  useEffect(() => {
    setColumns(columnsSheet);
  }, [])

  useEffect(() => {
    loadData()
  }, [filters])

  // const exportAll = async (type: number = 1) => {
  //   const selectors = [
  //     { title: "ID", selector: "id" },
  //     { title: "Nom", selector: "name" },
  //     { title: "Codification", selector: "codification" },
  //     { title: "Description", selector: "description" },
  //     { title: "Référence", selector: "reference" },
  //     { title: "Code-barre", selector: "barcode" },
  //     { title: "Type", selector: "type" },
  //     { title: "Marque", selector: "marque" },
  //     { title: "Unité", selector: "unite" },
  //     { title: "Groupe", selector: "group" },
  //     { title: "Sous-groupe", selector: "sous_group" },
  //     { title: "Famille", selector: "famille" },
  //     { title: "Sous-famille", selector: "sous_famille" },
  //     { title: "Prix de vente", selector: "sale_price" },
  //     { title: "Prix d'achat", selector: "purchase_price" },
  //     { title: "Prix d'achat avec taxes", selector: "purchase_price_with_taxes" },
  //     { title: "Prix de vente avec taxes", selector: "sale_price_with_taxes" },
  //     { title: "Quantité en stock", selector: "quantity_in_stock" },
  //     { title: "Date de création", selector: "created_at" },
  //     { title: "Date de mise à jour", selector: "updated_at" },
  //     { title: "Quantité minimale", selector: "quntity_min" },
  //     { title: "Quantité maximale", selector: "quntity_max" },
  //   ];

  //   const allItems = await getItems()
  //   if (allItems.status !== 200 || !allItems.data || !allItems.data.items) {
  //     toast.error(translateErrors("error"));
  //     return;
  //   }

  //   const itemsGet = JSON.parse(allItems.data.items);
  //   const formattedData = itemsGet.map((item: any) => ({
  //     id: item.id,
  //     name: item.name,
  //     codification: item.codification || "-",
  //     description: item.description || "-",
  //     reference: item.reference || "-",
  //     barcode: item.barcode || "-",
  //     marque: item.marque?.name || "-",
  //     unite: item.unite?.name || "-",
  //     group: item.group?.name || "-",
  //     sous_group: item.sous_group?.name || "-",
  //     famille: item.family?.name || "-",
  //     sous_famille: item.sous_family?.name || "-",
  //     sale_price: item.sale_price ? `${item.sale_price} ` : "-",
  //     purchase_price: item.purchase_price ? `${item.purchase_price} ` : "-",
  //     purchase_price_with_taxes: item.purchase_price_ttc ? `${item.purchase_price_ttc} ` : "-",
  //     sale_price_with_taxes: item.sale_price_ttc ? `${item.sale_price_ttc} ` : "-",
  //     quantity_in_stock: item.quantity_in_stock,
  //     created_at: new Date(item.created_at).toLocaleDateString(),
  //     updated_at: new Date(item.updated_at).toLocaleDateString(),
  //     quntity_min: item.quntity_min,
  //     quntity_max: item.quntity_max,
  //     type: item.consumable ? "consumable" : item.asset ? "asset" : item.part ? "part" : "service",
  //   }));
  //   generateFileClient(selectors, formattedData, type);
  // };

  const loadData = async () => {
    setLoading(true)
    try {
      const result = await getRestos(filters)
      if (result.status === 200) {
        const itemsGet = JSON.parse(result.data.restaurants || "[]");
        setData(itemsGet)
        setPagination({
          page: result.data.page,
          limit: result.data.limit,
          total: result.data.total,
          totalPages: result.data.totalPages,
        })
      }
    } catch (error) {
      toast.error("Erreur lors du chargement des articles")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof any, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }))
  }

  const handlePageChange = (newPage: number) => {
    setFilters((prev: any) => ({ ...prev, page: newPage }))
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteResto(id)
      if (result.status === 200) {
        toast.success("item supprimé avec succès")
        loadData()
      } else {
        toast.error(result.data.message || "Erreur lors de la suppression")
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  // const getStatusBadge = (status: string) => {
  //   const variants = {
  //     active: "default",
  //     inactive: "secondary",
  //     archived: "destructive",
  //   } as const

  //   const labels = {
  //     active: "Actif",
  //     inactive: "Inactif",
  //     archived: "Archivé",
  //   }

  //   return (
  //     <Badge variant={variants[status as keyof typeof variants] || "default"}>
  //       {labels[status as keyof typeof labels] || status}
  //     </Badge>
  //   )
  // }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/admin/restaurants/create">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel article
            </Link>
          </Button>
          {/* <ExportButton all={true} handleExportCSV={() => exportAll(1)} handleExportXLSX={() => exportAll(2)} /> */}
          <Link href="/admin/sheetimport">
            <Button>{translateSystem('import')}</Button>
          </Link>
        </div>
      </div>

      {sheetCreated && (
        <div className="bg-blue-500 text-white p-4 mb-4 rounded">
          {translateSystem("mustrefreshtoseedata")}
        </div>
      )}

      {sheetNotCreated && sheetNotCreated.length > 0 && (
        <div className="max-h-48 overflow-auto">
          {sheetNotCreated.map((data: any, index: any) => (
            <div key={index} className="mt-4 p-4 bg-red-200 text-red-700 rounded">
              <h2 className="font-bold">{translateErrors("errors")}</h2>
              <ul className="list-disc pl-5">
                <li>
                  {
                    (data.message ? data.message + " : " : "") + " " + (data.restaurant.nomfr ?? "") 
                  }
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filters.statut || "0"}
              onValueChange={(value) => handleFilterChange("statut", value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.limit?.toString() || "25"}
              onValueChange={(value) => handleFilterChange("limit", value === "all" ? -1 : Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 par page</SelectItem>
                <SelectItem value="50">50 par page</SelectItem>
                <SelectItem value="100">100 par page</SelectItem>
                <SelectItem value="all">Tous</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom fr</TableHead>
                <TableHead>adresse fr</TableHead>
                <TableHead>telephone</TableHead>
                <TableHead>email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Aucun article trouvé
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nomfr}</TableCell>
                    <TableCell>{item.adressefr || "-"}</TableCell>
                    <TableCell>{item.telephone || "-"}</TableCell>
                    <TableCell>{item.email || "-"}</TableCell>
                    <TableCell>{item.statut}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/restaurants/${item.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/restaurants/${item.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet item ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)}>Supprimer</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Précédent
          </Button>
          <span className="flex items-center px-4">
            Page {pagination.page} sur {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  )
}
