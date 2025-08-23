"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
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
  const [image, setImage] = useState<string | null>(null)
  const origin = useOrigin()
  const [isChanged, setIsChanged] = useState(false)

  const form = useForm<any>({
    defaultValues: {
      nomfr: item?.nomfr || "",
      nomar: item?.nomar || "",
      nomen: item?.nomen || "",
      nomes: item?.nomes || "",
      nompt: item?.nompt || "",

      descriptionfr: item?.descriptionfr || "",
      descriptionen: item?.descriptionen || "",
      descriptionar: item?.descriptionar || "",
      descriptiones: item?.descriptiones || "",
      descriptionpt: item?.descriptionpt || "",

      adressefr: item?.adressefr || "",
      adresseen: item?.adresseen || "",
      adressear: item?.adressear || "",
      adressees: item?.adressees || "",
      adressept: item?.adressept || "",

      telephone: item?.telephone || "",
      email: item?.email || "",
      site_web: item?.site_web || "",

      wilayafr: item?.wilayafr || "",
      wilayaar: item?.wilayaar || "",
      wilayaen: item?.wilayaen || "",
      wilayaes: item?.wilayaes || "",
      wilayapt: item?.wilayapt || "",

      etoiles: item?.etoiles || 0,
      prix_min: item?.prix_min || 0,
      prix_max: item?.prix_max || 0,
      latitude: item?.latitude || 0,
      longitude: item?.longitude || 0,

      servicesfr: item?.servicesfr || "",
      servicesen: item?.servicesen || "",
      servicesar: item?.servicesar || "",
      serviceses: item?.serviceses || "",
      servicespt: item?.servicespt || "",

      statut: item?.statut || "actif",

      debutdepart: item?.debutdepart || "",
      findepart: item?.findepart || "",
      intervalledepart: item?.intervalledepart || 0,
      debutretour: item?.debutretour || "",
      finretour: item?.finretour || "",
      intervalleretour: item?.intervalleretour || 0,

      zonefr: item?.zonefr || "",
      zonear: item?.zonear || "",
      zoneen: item?.zoneen || "",
      zonees: item?.zonees || "",
      zonept: item?.zonept || "",

      quaifr: item?.quaifr || "",
      quaiar: item?.quaiar || "",
      quaien: item?.quaien || "",
      quaies: item?.quaies || "",
      quaipt: item?.quaipt || "",

      distance: item?.distance || 0,
      tempestimer: item?.tempestimer || "",

      image_url: item?.image_url || null,
    }
  })

  useEffect(() => {
    if (item) {
      setImage(item.image_url ?? null)
    }
  }, [item])

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      if (!origin) return

      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString())
        }
      })
      formData.append("is_image", isChanged ? "true" : "false")

      if (data.image) {
        formData.append("file", data.image)
      }

      const fetchUrl =
        mode === "create" ? origin + "/api/admin/hotels" : origin + "/api/admin/hotels/" + item.id
      const result = mode === "create"
        ? await axios.post(fetchUrl, formData)
        : await axios.put(fetchUrl, formData)

      if (result.status === 200 || result.status === 201) {
        toast.success(mode === "create" ? "Hôtel créé avec succès" : "Hôtel modifié avec succès")
        router.push("/admin/hotels")
      } else {
        toast.error(result.data.message || "Une erreur est survenue")
      }
    } catch (error) {
      toast.error("Erreur lors de l’envoi")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Infos générales */}
        <Card>
          <CardHeader><CardTitle>Infos générales</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <AvatarUploader circle={false} name="image" image={image} setIsChanged={setIsChanged} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["nomfr","nomar","nomen","nomes","nompt"].map((f)=>(
                <FormField key={f} control={form.control} name={f} render={({field})=>(
                  <FormItem>
                    <FormLabel>{f}</FormLabel>
                    <FormControl><Input {...field}/></FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["email","telephone","site_web"].map((f)=>(
              <FormField key={f} control={form.control} name={f} render={({field})=>(
                <FormItem>
                  <FormLabel>{f}</FormLabel>
                  <FormControl><Input {...field}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            ))}
          </CardContent>
        </Card>

        {/* Adresses */}
        <Card>
          <CardHeader><CardTitle>Adresses</CardTitle></CardHeader>
          <CardContent>
            {["adressefr","adressear","adresseen","adressees","adressept"].map((f)=>(
              <FormField key={f} control={form.control} name={f} render={({field})=>(
                <FormItem>
                  <FormLabel>{f}</FormLabel>
                  <FormControl><Textarea {...field}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            ))}
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader><CardTitle>Services</CardTitle></CardHeader>
          <CardContent>
            {["servicesfr","servicesar","servicesen","serviceses","servicespt"].map((f)=>(
              <FormField key={f} control={form.control} name={f} render={({field})=>(
                <FormItem>
                  <FormLabel>{f}</FormLabel>
                  <FormControl><Textarea {...field}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            ))}
          </CardContent>
        </Card>

        {/* Coordonnées géographiques */}
        <Card>
          <CardHeader><CardTitle>Coordonnées & Prix</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["etoiles","prix_min","prix_max","latitude","longitude","distance"].map((f)=>(
              <FormField key={f} control={form.control} name={f} render={({field})=>(
                <FormItem>
                  <FormLabel>{f}</FormLabel>
                  <FormControl><Input type="number" {...field}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            ))}
          </CardContent>
        </Card>

        {/* Statut */}
        <Card>
          <CardHeader><CardTitle>Statut</CardTitle></CardHeader>
          <CardContent>
            <FormField control={form.control} name="statut" render={({field})=>(
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Choisir statut"/></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {mode==="create"?"Créer":"Modifier"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
