"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useOrigin } from "@/hooks/use-origin"
import AvatarUploader from "@/components/myui/avatar-uploader"
import axios from "axios"

interface ItemFormProps {
  item?: any
  mode: "create" | "edit"
}

export function ItemForm({ item, mode }: ItemFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const origin = useOrigin()

  const form = useForm<any>({
    defaultValues: {
      nomfr: item?.nomfr || "",
      nomar: item?.nomar || "",
      nomen: item?.nomen || "",
      nomes: item?.nomes || "",
      nompt: item?.nompt || "",

      descriptionfr: item?.descriptionfr || "",
      descriptionar: item?.descriptionar || "",
      descriptionen: item?.descriptionen || "",
      descriptiones: item?.descriptiones || "",
      descriptionpt: item?.descriptionpt || "",

      statut: item?.statut || "active",
      image: item?.image || null,
      email: item?.email || "",
      telephone: item?.telephone || "",
      site_web: item?.site_web || "",

      adressefr: item?.adressefr || "",
      adressear: item?.adressear || "",
      adresseen: item?.adresseen || "",
      adresseses: item?.adresseses || "",
      adressept: item?.adressept || "",

      type_cuisinefr: item?.type_cuisinefr || "",
      type_cuisinear: item?.type_cuisinear || "",
      type_cuisineen: item?.type_cuisineen || "",
      type_cuisinees: item?.type_cuisinees || "",
      type_cuisinept: item?.type_cuisinept || "",

      prix_moyen: Number.parseInt(item?.prix_moyen) || 0,
      horaires_ouverture: item?.horaires_ouverture || "",
      latitude: Number.parseInt(item?.latitude) || 0,
      longitude: Number.parseInt(item?.longitude) || 0,

      specialitesfr: item?.specialitesfr || "",
      specialitesar: item?.specialitesar || "",
      specialitesen: item?.specialitesen || "",
      specialiteses: item?.specialiteses || "",
      specialitespt: item?.specialitespt || "",
    }
  })

  useEffect(() => {
    const loadData = async () => {
      if (item) {
        setImage(item.image_id ?? null)
      }
    }
    loadData()
  }, [])

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      if (!origin) return

      const formData = new FormData()
      formData.append("nomfr", data.nomfr)
      formData.append("nomar", data.nomar)
      formData.append("nomen", data.nomen)
      formData.append("nomes", data.nomes)
      formData.append("nompt", data.nompt)

      formData.append("descriptionfr", data.descriptionfr)
      formData.append("descriptionar", data.descriptionar)
      formData.append("descriptionen", data.descriptionen)
      formData.append("descriptiones", data.descriptiones)
      formData.append("descriptionpt", data.descriptionpt)

      formData.append("statut", data.statut)
      formData.append("email", data.email)
      formData.append("telephone", data.telephone)
      formData.append("site_web", data.site_web)

      formData.append("adressefr", data.adressefr)
      formData.append("adressear", data.adressear)
      formData.append("adresseen", data.adresseen)
      formData.append("adresseses", data.adresseses)
      formData.append("adressept", data.adressept)

      formData.append("type_cuisinefr", data.type_cuisinefr)
      formData.append("type_cuisinear", data.type_cuisinear)
      formData.append("type_cuisineen", data.type_cuisineen)
      formData.append("type_cuisinees", data.type_cuisinees)
      formData.append("type_cuisinept", data.type_cuisinept)

      formData.append("prix_moyen", data.prix_moyen.toString())
      formData.append("horaires_ouverture", data.horaires_ouverture)
      formData.append("latitude", data.latitude.toString())
      formData.append("longitude", data.longitude.toString())

      formData.append("specialitesfr", data.specialitesfr)
      formData.append("specialitesar", data.specialitesar)
      formData.append("specialitesen", data.specialitesen)
      formData.append("specialiteses", data.specialiteses)
      formData.append("specialitespt", data.specialitespt)

      formData.append("is_image", isChanged ? "true" : "false")
      if (data.image) {
        formData.append("file", data.image)
      }

      const fetchUrl =
        mode === "create" ? origin + "/api/admin/restaurants" : origin + "/api/admin/restaurants/" + item.id
      const result = mode === "create" ? await axios.post(fetchUrl, formData) : await axios.put(fetchUrl, formData)
      const res = await result


      if (res.status === 200 || res.status === 201) {
        toast.success(mode === "create" ? "Restaurant créé avec succès" : "Restaurant modifié avec succès")
        router.push("/admin/restaurants")
      } else {
        toast.error(res.data.message || "Une erreur est survenue")
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AvatarUploader circle={false} name="image" image={image} setIsChanged={setIsChanged} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nomfr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom (Français) *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom (Arabe)</FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom (Anglais)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom (Espagnol)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom (Portugais)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="descriptionfr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Français)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Arabe)</FormLabel>
                  <FormControl>
                    <Textarea {...field} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Anglais)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptiones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Espagnol)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Portugais)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="site_web"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site web</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section Adresses */}
        <Card>
          <CardHeader>
            <CardTitle>Adresses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="adressefr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse (Français)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adressear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse (Arabe)</FormLabel>
                  <FormControl>
                    <Textarea {...field} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresseen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse (Anglais)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresseses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse (Espagnol)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adressept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse (Portugais)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section Type de cuisine */}
        <Card>
          <CardHeader>
            <CardTitle>Type de cuisine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type_cuisinefr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de cuisine (Français)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type_cuisinear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de cuisine (Arabe)</FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type_cuisineen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de cuisine (Anglais)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type_cuisinees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de cuisine (Espagnol)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type_cuisinept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de cuisine (Portugais)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section Informations pratiques */}
        <Card>
          <CardHeader>
            <CardTitle>Informations pratiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="prix_moyen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix moyen (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="horaires_ouverture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horaires d'ouverture</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Lun-Ven: 9h-18h, Sam: 10h-16h" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section Spécialités */}
        <Card>
          <CardHeader>
            <CardTitle>Spécialités</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="specialitesfr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialités (Français)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Séparer par des virgules" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialitesar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialités (Arabe)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Séparer par des virgules" {...field} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialitesen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialités (Anglais)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Séparer par des virgules" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialiteses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialités (Espagnol)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Séparer par des virgules" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialitespt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialités (Portugais)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Séparer par des virgules" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Créer" : "Modifier"}
          </Button>
        </div>
      </form>
    </Form>
  )
}