"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPinIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createContactMessage } from '@/actions/contact/set';
import { createOtp, resendOtp, verifyOtp } from '@/actions/contact/otp';
import Image from 'next/image';
import Loading from '@/components/myui/loading';
import toast from 'react-hot-toast';

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


const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: "", subject: "", message: '', hotel: "", country: "" });
    const t = useTranslations();
    const [showDialog, setShowDialog] = useState(false)
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false) // 👈 état loading
    const [loading2, setLoading2] = useState(false) // 👈 état loading

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true) // démarrer loading
        try {
            const result = await createOtp(formData.email)

            if (result.status !== 200) {
                toast.error(t('Error.title'))
                setLoading(false)
                return
            }
            setShowDialog(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false) // arrêter loading
        }
    }

    const handleVerified = async () => {
        setLoading2(true)
        if (formData.email && code) {
            const res = await verifyOtp(formData.email, code)
            if (res.status === 200) {
                const contact = await createContactMessage(formData)
                if (contact.status !== 200) {
                    toast.error(contact.data.errors[0].message)
                } else {
                    toast("Verified ✅")
                }
                setFormData({ name: '', email: '', phone: "", subject: "", message: '', hotel: "", country: "" })
                setShowDialog(false)
            } else {
                toast(res.message)
            }
        }
        setLoading2(false)
    }

    const handleResent = async () => {
        if (formData.email) await resendOtp(formData.email)
        toast("Nouveau code envoyé ✅")
    }

    return (
        <section id='contact' className="py-20 bg-white lg:px-40">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('contact.title')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            {t('contact.subtitle')}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.name')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.subject')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.phone')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.email')}
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('busRequest.hotel')}
                                </label>
                                <input
                                    type="hotel"
                                    value={formData.hotel}
                                    onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.message')}
                                </label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: loading ? 1 : 1.05 }}
                                whileTap={{ scale: loading ? 1 : 0.95 }}
                                type="submit"
                                disabled={loading} // 👈 désactivation bouton
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-shadow text-white 
                                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-orange-500 hover:shadow-lg"}`}
                            >
                                {loading ?
                                    <div className='w-full flex justify-center items-center'>
                                        <Loading></Loading>
                                    </div>
                                    : t('contact.send')}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Colonne droite */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Image alt="Contact us" src={"/contact.avif"} width={300} height={300} className='h-[300px] w-[300px] mx-auto mb-10' />
                        {/* ... tes infos de contact ... */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-2xl"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                {t('contact.links')}
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{t('footer.phone')}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{t('footer.email')}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <MapPinIcon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{t('footer.address')}</div>
                                        {/* <div className="text-gray-600">{t('footer.address')}</div> */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Dialog OTP */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300">
                    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl w-full max-w-md mx-4 shadow-2xl border border-gray-100 transform transition-transform duration-300 scale-in">
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("busRequest.verifyTitle")}</h2>
                            {/* <p className="text-gray-500">{t("busRequest.verifySubtitle")}</p> */}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("busRequest.verifyPlaceholder")}
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="XXXXXX"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleVerified}
                                disabled={loading2}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                            >
                                {loading2 ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    t("busRequest.verifyButton")
                                )}
                            </button>

                            <button
                                onClick={handleResent}
                                className="text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors duration-200 flex items-center justify-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {t("busRequest.resendCode")}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowDialog(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Contact
