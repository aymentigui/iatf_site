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

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: "", subject: "", message: '' });
    const t = useTranslations();
    const [contactId, setContactId] = useState<string | null>(null)
    const [showDialog, setShowDialog] = useState(false)
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false) // 👈 état loading

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true) // démarrer loading
        try {
            const result = await createContactMessage(formData) // doit retourner {id, email}

            if (result.status !== 200) {
                console.error("Erreur lors de l'envoi du message")
                setLoading(false)
                return
            }

            const contact = result.data
            setContactId(contact.id)

            // Création OTP
            await createOtp(contact.id, contact.email)

            setShowDialog(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false) // arrêter loading
        }
    }

    return (
        <section className="py-20 bg-white lg:px-40">
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
                                    required
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
                                    required
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
                                {loading ? "Envoi..." : t('contact.send')}
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
                    </motion.div>
                </div>
            </div>

            {/* Dialog OTP */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-lg font-bold mb-4">Vérification email</h2>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border rounded p-2 mb-4"
                            placeholder="Entrez le code reçu"
                        />
                        <button
                            onClick={async () => {
                                if (contactId) {
                                    const res = await verifyOtp(contactId, code)
                                    if (res.status === 200) {
                                        alert("Verified ✅")
                                        setFormData({ name: '', email: '', phone: "", subject: "", message: '' })
                                        setShowDialog(false)
                                    } else {
                                        alert(res.message)
                                    }
                                }
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                        >
                            Vérifier
                        </button>
                        <button
                            onClick={async () => {
                                if (contactId) await resendOtp(contactId)
                                alert("Nouveau code envoyé ✅")
                            }}
                            className="text-blue-600 underline"
                        >
                            Renvoyer le code
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Contact
