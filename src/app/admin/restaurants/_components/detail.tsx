"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DetailProps {
  item: any
}

export function Detail({ item }: DetailProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">{item.nomfr || item.nomen || "Sans nom"}</h1>
          <span className="px-2 py-1 text-xs rounded bg-muted">{item.statut}</span>
        </div>
        <Button asChild>
          <Link href={`/admin/restaurants/${item.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infos générales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">Nom FR :</span> {item.nomfr || "-"}</p>
            <p><span className="font-medium">Nom AR :</span> {item.nomar || "-"}</p>
            <p><span className="font-medium">Nom EN :</span> {item.nomen || "-"}</p>
            <p><span className="font-medium">Nom ES :</span> {item.nomes || "-"}</p>
            <p><span className="font-medium">Nom PT :</span> {item.nompt || "-"}</p>
          </CardContent>
        </Card>

        {/* Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">FR :</span> {item.descriptionfr || "-"}</p>
            <p><span className="font-medium">AR :</span> {item.descriptionar || "-"}</p>
            <p><span className="font-medium">EN :</span> {item.descriptionen || "-"}</p>
            <p><span className="font-medium">ES :</span> {item.descriptiones || "-"}</p>
            <p><span className="font-medium">PT :</span> {item.descriptionpt || "-"}</p>
          </CardContent>
        </Card>

        {/* Adresses */}
        <Card>
          <CardHeader>
            <CardTitle>Adresses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">FR :</span> {item.adressefr || "-"}</p>
            <p><span className="font-medium">AR :</span> {item.adressear || "-"}</p>
            <p><span className="font-medium">EN :</span> {item.adresseen || "-"}</p>
            <p><span className="font-medium">ES :</span> {item.adressees || "-"}</p>
            <p><span className="font-medium">PT :</span> {item.adressept || "-"}</p>
          </CardContent>
        </Card>

        {/* Coordonnées */}
        <Card>
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">Téléphone :</span> {item.telephone || "-"}</p>
            <p><span className="font-medium">Email :</span> {item.email || "-"}</p>
            <p><span className="font-medium">Site web :</span> {item.site_web || "-"}</p>
          </CardContent>
        </Card>

        {/* Types de cuisine */}
        <Card>
          <CardHeader>
            <CardTitle>Types de cuisine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">FR :</span> {item.type_cuisinefr || "-"}</p>
            <p><span className="font-medium">AR :</span> {item.type_cuisinear || "-"}</p>
            <p><span className="font-medium">EN :</span> {item.type_cuisineen || "-"}</p>
            <p><span className="font-medium">ES :</span> {item.type_cuisinees || "-"}</p>
            <p><span className="font-medium">PT :</span> {item.type_cuisinept || "-"}</p>
          </CardContent>
        </Card>

        {/* Informations pratiques */}
        <Card>
          <CardHeader>
            <CardTitle>Informations pratiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">Prix moyen :</span> {item.prix_moyen ?? "-"}</p>
            <p><span className="font-medium">Horaires :</span> {item.horaires_ouverture || "-"}</p>
          </CardContent>
        </Card>

        {/* Localisation */}
        <Card>
          <CardHeader>
            <CardTitle>Localisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">Latitude :</span> {item.latitude ?? "-"}</p>
            <p><span className="font-medium">Longitude :</span> {item.longitude ?? "-"}</p>
          </CardContent>
        </Card>

        {/* Spécialités */}
        <Card>
          <CardHeader>
            <CardTitle>Spécialités</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-medium">FR :</span> {item.specialitesfr || "-"}</p>
            <p><span className="font-medium">AR :</span> {item.specialitesar || "-"}</p>
            <p><span className="font-medium">EN :</span> {item.specialitesen || "-"}</p>
            <p><span className="font-medium">ES :</span> {item.specialiteses || "-"}</p>
            <p><span className="font-medium">PT :</span> {item.specialitespt || "-"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Dates */}
      <div className="text-xs text-muted-foreground">
        <p>Créé le : {(item.date_creation)}</p>
        <p>Modifié le : {(item.date_modification)}</p>
      </div>
    </div>
  )
}
