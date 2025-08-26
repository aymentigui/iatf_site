"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import Loading from "@/components/myui/loading"
import { createOtp, resendOtp, verifyOtp } from "@/actions/contact/otp"
import { createBusRequest } from "@/actions/contact/set"

// Liste des pays africains incluant الصحراء الغربية
const africanCountriesKeys = [
    "algeria", "morocco", "tunisia", "libya", "egypt", "mauritania", "mali",
    "niger", "chad", "sudan", "south_sudan", "eritrea", "djibouti", "somalia",
    "ethiopia", "kenya", "uganda", "tanzania", "rwanda", "burundi", "drc",
    "congo", "gabon", "equatorial_guinea", "cameroon", "nigeria", "benin", "togo",
    "ghana", "burkina_faso", "ivory_coast", "liberia", "sierra_leone", "guinea", "guinea_bissau",
    "senegal", "gambia", "cape_verde", "south_africa", "namibia", "botswana", "zimbabwe",
    "zambia", "mozambique", "malawi", "lesotho", "eswatini", "madagascar", "comoros",
    "seychelles", "mauritius", "western_sahara"
]

const BusRequest = () => {
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        urgence: "",
        hotel: "",
        country: ""
    })
    const [showDialog, setShowDialog] = useState(false)
    const [code, setCode] = useState("")

    // Soumission formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await createOtp(formData.email)
            if (result.status !== 200) {
                toast.error(t("Error.title"))
                setLoading(false)
                return
            }
            setShowDialog(true) // 👈 ouvre le dialog OTP
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Vérification OTP
    const handleVerified = async () => {
        if (formData.email && code) {
            const res = await verifyOtp(formData.email, code)
            if (res.status === 200) {
                const request = await createBusRequest(formData)
                if (request.status !== 200) {
                    toast.error(request.data.errors[0].message)
                } else {
                    toast.success(t("busRequest.success"))
                }
                // Reset form
                setFormData({ name: "", email: "", phone: "", urgence: "", hotel: "", country: "" })
                setShowDialog(false)
            } else {
                toast.error(t("busRequest.error"))
            }
        }
    }

    // Renvoyer le code OTP
    const handleResent = async () => {
        if (formData.email) await resendOtp(formData.email)
        toast("Nouveau code envoyé ✅")
    }

    return (
        <section className="py-20 bg-white lg:px-40">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t("busRequest.title")}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        {t("busRequest.subtitle")}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nom */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.name")}
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.email")}
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Téléphone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.phone")}
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Urgence */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.urgence")}
                            </label>
                            <select
                                value={formData.urgence}
                                onChange={(e) => setFormData({ ...formData, urgence: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">------------</option>
                                <option value="immediate">{t("busRequest.urgenceOptions.immediate")}</option>
                                <option value="today">{t("busRequest.urgenceOptions.today")}</option>
                                <option value="week">{t("busRequest.urgenceOptions.week")}</option>
                            </select>
                        </div>

                        {/* Hôtel */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.hotel")}
                            </label>
                            <input
                                type="text"
                                value={formData.hotel}
                                onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Pays */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.country")}
                            </label>
                            <select
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">{t("busRequest.country")}</option>
                                {africanCountriesKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {t(`country.${key}`)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Bouton */}
                        <motion.button
                            whileHover={{ scale: loading ? 1 : 1.05 }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 rounded-lg font-semibold transition-shadow text-white 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-orange-500 hover:shadow-lg"}`}
                        >
                            {loading ? (
                                <div className="w-full flex justify-center items-center">
                                    <Loading />
                                </div>
                            ) : t("busRequest.send")}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Dialog OTP 👇 */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-lg font-bold mb-4">{t("busRequest.verifyTitle")}</h2>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border rounded p-2 mb-4"
                            placeholder={t("busRequest.verifyPlaceholder")}
                        />
                        <button
                            onClick={handleVerified}
                            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                        >
                            {t("busRequest.verifyButton")}
                        </button>
                        <button
                            onClick={handleResent}
                            className="text-blue-600 underline"
                        >
                            {t("busRequest.resendCode")}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default BusRequest
