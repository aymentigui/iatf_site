"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Bus, Calendar, Clock, MapPin, User } from "lucide-react"
import { z } from "zod"
import toast from "react-hot-toast"
import { CreateBusRequest2 } from "@/actions/bus/set"
import { useTranslations } from 'next-intl'



export function BusRequestForm() {
    const t = useTranslations('busRequest2')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const busRequestSchema = z.object({
        name: z.string().min(2, t('form.name.error')).optional().or(z.literal("")),
        hotel: z.string().min(5, t('form.hotel.error')),
        date: z.string().min(1, t('form.date.error')),
        time: z.string().min(1, t('form.time.error')),
    })

    type BusRequestFormData = z.infer<typeof busRequestSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BusRequestFormData>({
        resolver: zodResolver(busRequestSchema),
    })

    const onSubmit = async (data: BusRequestFormData) => {
        setIsSubmitting(true)
        setSubmitSuccess(false)

        try {
            const response = await CreateBusRequest2(data)

            if (response.status === 200) {
                setSubmitSuccess(true)
                reset()
                toast.success(t('toast.success'))
            } else {
                toast.error(response.data.message || t('toast.error'))
            }
        } catch (error) {
            toast.error(t('toast.networkError'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Bus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {submitSuccess && (
                    <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                        <AlertDescription>{t('success.message')}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {t('form.name.label')}
                        </Label>
                        <Input
                            id="name"
                            placeholder={t('form.name.placeholder')}
                            {...register("name")}
                            className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {t('form.name.error')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hotel" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {t('form.hotel.label')}
                        </Label>
                        <Input
                            id="hotel"
                            placeholder={t('form.hotel.placeholder')}
                            {...register("hotel")}
                            className={errors.hotel ? "border-destructive" : ""}
                        />
                        {errors.hotel && (
                            <p className="text-sm text-destructive">
                                {t('form.hotel.error')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {t('form.date.label')}
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            {...register("date")}
                            className={errors.date ? "border-destructive" : ""}
                        />
                        {errors.date && (
                            <p className="text-sm text-destructive">
                                {t('form.date.error')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {t('form.time.label')}
                        </Label>
                        <Input
                            id="time"
                            type="time"
                            {...register("time")}
                            className={errors.time ? "border-destructive" : ""}
                        />
                        {errors.time && (
                            <p className="text-sm text-destructive">
                                {t('form.time.error')}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t('form.submitting')}
                            </>
                        ) : (
                            t('form.submit')
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}