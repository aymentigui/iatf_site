// components/admin/RestaurantForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantFormProps {
  restaurant: Restaurant | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function RestaurantForm({ restaurant, onSubmit, onClose }: RestaurantFormProps) {
  const [formData, setFormData] = useState({
    nomFR: '',
    nomEN: '',
    descriptionFR: '',
    descriptionEN: '',
    adresseFR: '',
    adresseEN: '',
    telephone: '',
    email: '',
    site_web: '',
    type_cuisineFR: '',
    type_cuisineEN: '',
    prix_moyen: '',
    horaires_ouverture: '',
    latitude: '',
    longitude: '',
    statut: 'actif'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (restaurant) {
      setFormData({
        nomFR: restaurant.nomFR || '',
        nomEN: restaurant.nomEN || '',
        descriptionFR: restaurant.descriptionFR || '',
        descriptionEN: restaurant.descriptionEN || '',
        adresseFR: restaurant.adresseFR || '',
        adresseEN: restaurant.adresseEN || '',
        telephone: restaurant.telephone || '',
        email: restaurant.email || '',
        site_web: restaurant.site_web || '',
        type_cuisineFR: restaurant.type_cuisineFR || '',
        type_cuisineEN: restaurant.type_cuisineEN || '',
        prix_moyen: restaurant.prix_moyen?.toString() || '',
        horaires_ouverture: restaurant.horaires_ouverture || '',
        latitude: restaurant.latitude?.toString() || '',
        longitude: restaurant.longitude?.toString() || '',
        statut: restaurant.statut || 'actif'
      });
    }
  }, [restaurant]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nomFR) newErrors.nomFR = 'Le nom français est requis';
    if (!formData.descriptionFR) newErrors.descriptionFR = 'La description française est requise';
    if (!formData.adresseFR) newErrors.adresseFR = 'L\'adresse française est requise';
    if (!formData.telephone) newErrors.telephone = 'Le téléphone est requis';
    if (!formData.type_cuisineFR) newErrors.type_cuisineFR = 'Le type de cuisine est requis';
    if (!formData.prix_moyen) newErrors.prix_moyen = 'Le prix moyen est requis';
    if (!formData.horaires_ouverture) newErrors.horaires_ouverture = 'Les horaires sont requis';
    if (!formData.latitude) newErrors.latitude = 'La latitude est requise';
    if (!formData.longitude) newErrors.longitude = 'La longitude est requise';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (isNaN(parseFloat(formData.prix_moyen))) {
      newErrors.prix_moyen = 'Le prix moyen doit être un nombre';
    }
    
    if (isNaN(parseFloat(formData.latitude))) {
      newErrors.latitude = 'La latitude doit être un nombre';
    }
    
    if (isNaN(parseFloat(formData.longitude))) {
      newErrors.longitude = 'La longitude doit être un nombre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      prix_moyen: parseFloat(formData.prix_moyen),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };

    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {restaurant ? 'Modifier le restaurant' : 'Ajouter un restaurant'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Champs français */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Français</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nom *</label>
                <input
                  type="text"
                  name="nomFR"
                  value={formData.nomFR}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.nomFR ? 'border-red-500' : ''}`}
                />
                {errors.nomFR && <p className="text-red-500 text-sm">{errors.nomFR}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="descriptionFR"
                  value={formData.descriptionFR}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-2 border rounded ${errors.descriptionFR ? 'border-red-500' : ''}`}
                />
                {errors.descriptionFR && <p className="text-red-500 text-sm">{errors.descriptionFR}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Adresse *</label>
                <input
                  type="text"
                  name="adresseFR"
                  value={formData.adresseFR}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.adresseFR ? 'border-red-500' : ''}`}
                />
                {errors.adresseFR && <p className="text-red-500 text-sm">{errors.adresseFR}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Type de cuisine *</label>
                <input
                  type="text"
                  name="type_cuisineFR"
                  value={formData.type_cuisineFR}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.type_cuisineFR ? 'border-red-500' : ''}`}
                />
                {errors.type_cuisineFR && <p className="text-red-500 text-sm">{errors.type_cuisineFR}</p>}
              </div>
            </div>
            
            {/* Champs anglais */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">English</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="nomEN"
                  value={formData.nomEN}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="descriptionEN"
                  value={formData.descriptionEN}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="adresseEN"
                  value={formData.adresseEN}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cuisine type</label>
                <input
                  type="text"
                  name="type_cuisineEN"
                  value={formData.type_cuisineEN}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            {/* Champs communs */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone *</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.telephone ? 'border-red-500' : ''}`}
                />
                {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Site web</label>
                <input
                  type="url"
                  name="site_web"
                  value={formData.site_web}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prix moyen (€) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="prix_moyen"
                  value={formData.prix_moyen}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.prix_moyen ? 'border-red-500' : ''}`}
                />
                {errors.prix_moyen && <p className="text-red-500 text-sm">{errors.prix_moyen}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Horaires *</label>
                <input
                  type="text"
                  name="horaires_ouverture"
                  value={formData.horaires_ouverture}
                  onChange={handleChange}
                  placeholder="ex: Lun-Ven: 9h-18h, Sam: 10h-16h"
                  className={`w-full p-2 border rounded ${errors.horaires_ouverture ? 'border-red-500' : ''}`}
                />
                {errors.horaires_ouverture && <p className="text-red-500 text-sm">{errors.horaires_ouverture}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Statut</label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Latitude *</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.latitude ? 'border-red-500' : ''}`}
                />
                {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Longitude *</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.longitude ? 'border-red-500' : ''}`}
                />
                {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude}</p>}
              </div>
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {restaurant ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
