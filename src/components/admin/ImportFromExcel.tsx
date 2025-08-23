// components/admin/ImportFromExcel.tsx
'use client';

import { useState } from 'react';
import * as ExcelJS from 'exceljs';

interface ImportFromExcelProps {
  onClose: () => void;
  onImport: () => void;
}

// Mapping des colonnes Excel vers les champs de la base de données
const columnMapping = {
  'Nom FR': 'nomFR',
  'Description FR': 'descriptionFR',
  'Adresse FR': 'adresseFR',
  'Téléphone': 'telephone',
  'Type cuisine FR': 'type_cuisineFR',
  'Prix moyen': 'prix_moyen',
  'Horaires': 'horaires_ouverture',
  'Latitude': 'latitude',
  'Longitude': 'longitude',
  'Nom EN': 'nomEN',
  'Description EN': 'descriptionEN',
  'Adresse EN': 'adresseEN',
  'Type cuisine EN': 'type_cuisineEN',
  'Email': 'email',
  'Site web': 'site_web',
  'Statut': 'statut'
};

export default function ImportFromExcel({ onClose, onImport }: ImportFromExcelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setValidationErrors([]);
    setProgress(0);

    try {
      const workbook = new ExcelJS.Workbook();
      
      // Charger le fichier Excel
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);
      
      // Prendre la première feuille
      const worksheet = workbook.worksheets[0];
      
      if (!worksheet) {
        throw new Error('Aucune feuille trouvée dans le fichier Excel');
      }

      // Lire les en-têtes de colonnes
      const headerRow = worksheet.getRow(1);
      const headers: string[] = [];
      
      headerRow.eachCell((cell, colNumber) => {
        headers[colNumber] = cell.value?.toString() || '';
      });

      // Valider les en-têtes requis
      const requiredHeaders = ['Nom FR', 'Description FR', 'Adresse FR', 'Téléphone', 'Type cuisine FR', 'Prix moyen', 'Horaires', 'Latitude', 'Longitude'];
      const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
      
      if (missingHeaders.length > 0) {
        throw new Error(`En-têtes manquants: ${missingHeaders.join(', ')}`);
      }

      const restaurants = [];
      const errors = [];
      const totalRows = worksheet.rowCount;

      // Parcourir les lignes de données (à partir de la ligne 2)
      for (let i = 2; i <= totalRows; i++) {
        try {
          const row = worksheet.getRow(i);
          if (!row.hasValues) continue;

          const restaurantData: any = {};
          let hasData = false;

          // Parcourir chaque cellule de la ligne
          row.eachCell((cell, colNumber) => {
            const header = headers[colNumber];
            if (header && header in columnMapping) {
              const fieldName = columnMapping[header as keyof typeof columnMapping];
              restaurantData[fieldName] = cell.value;
              if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
                hasData = true;
              }
            }
          });

          // Ignorer les lignes vides
          if (!hasData) continue;

          // Validation des champs obligatoires
          const requiredFields = ['nomFR', 'descriptionFR', 'adresseFR', 'telephone', 'type_cuisineFR', 'prix_moyen', 'horaires_ouverture', 'latitude', 'longitude'];
          const missingFields = requiredFields.filter(field => !restaurantData[field] && restaurantData[field] !== 0);

          if (missingFields.length > 0) {
            errors.push({
              row: i,
              error: `Champs manquants: ${missingFields.join(', ')}`,
              data: restaurantData
            });
            continue;
          }

          // Conversion des types numériques
          if (restaurantData.prix_moyen) {
            restaurantData.prix_moyen = parseFloat(restaurantData.prix_moyen);
            if (isNaN(restaurantData.prix_moyen)) {
              errors.push({
                row: i,
                error: 'Prix moyen doit être un nombre',
                data: restaurantData
              });
              continue;
            }
          }

          if (restaurantData.latitude) {
            restaurantData.latitude = parseFloat(restaurantData.latitude);
            if (isNaN(restaurantData.latitude)) {
              errors.push({
                row: i,
                error: 'Latitude doit être un nombre',
                data: restaurantData
              });
              continue;
            }
          }

          if (restaurantData.longitude) {
            restaurantData.longitude = parseFloat(restaurantData.longitude);
            if (isNaN(restaurantData.longitude)) {
              errors.push({
                row: i,
                error: 'Longitude doit être un nombre',
                data: restaurantData
              });
              continue;
            }
          }

          // Valeur par défaut pour le statut
          if (!restaurantData.statut) {
            restaurantData.statut = 'actif';
          }

          restaurants.push(restaurantData);
        } catch (rowError) {
          errors.push({
            row: i,
            error: `Erreur de traitement: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`,
            data: null
          });
        }

        // Mettre à jour la progression
        setProgress(Math.round(((i - 1) / (totalRows - 1)) * 100));
      }

      if (errors.length > 0) {
        setValidationErrors(errors);
        setError(`${errors.length} erreurs de validation trouvées. Voulez-vous continuer avec les données valides ?`);
        return;
      }

      // Envoyer les données au serveur
      const response = await fetch('/api/restaurants/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurants)
      });

      const result = await response.json();

      if (result.success) {
        alert(`${result.data.created} restaurants créés, ${result.data.updated} mis à jour, ${result.data.errors} erreurs`);
        onImport();
        onClose();
      } else {
        setError(result.message || 'Erreur lors de l\'importation');
      }
    } catch (err) {
      console.error('Erreur lors de l\'importation:', err);
      setError('Erreur lors de la lecture du fichier: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const continueWithValidData = async () => {
    setError('');
    setLoading(true);

    try {
      // Filtrer seulement les données valides
      const validRestaurants = validationErrors
        .filter(error => error.data)
        .map(error => error.data);

      // Envoyer les données valides au serveur
      const response = await fetch('/api/restaurants/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validRestaurants)
      });

      const result = await response.json();

      if (result.success) {
        alert(`${result.data.created} restaurants créés, ${result.data.updated} mis à jour, ${result.data.errors} erreurs`);
        onImport();
        onClose();
      } else {
        setError(result.message || 'Erreur lors de l\'importation');
      }
    } catch (err) {
      console.error('Erreur lors de l\'importation:', err);
      setError('Erreur lors de l\'importation des données valides');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Restaurants');

      // Définir les en-têtes
      const headers = Object.keys(columnMapping);
      worksheet.addRow(headers);

      // Ajouter un exemple de données
      const exampleData = [
        'Restaurant Français',
        'Description en français',
        '123 Rue Example, Paris',
        '0123456789',
        'Française',
        '25.50',
        'Lun-Sam: 12h-15h, 19h-23h',
        '48.8566',
        '2.3522',
        'French Restaurant',
        'Description in English',
        '123 Example Street, Paris',
        'French',
        'contact@example.com',
        'https://example.com',
        'actif'
      ];
      worksheet.addRow(exampleData);

      // Styliser les en-têtes
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      // Ajuster la largeur des colonnes
      worksheet.columns = headers.map(header => ({
        width: header.length + 5
      }));

      // Générer le fichier
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template_restaurants.xlsx';
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erreur lors de la création du template:', err);
      setError('Erreur lors de la création du template');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Importer depuis Excel</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Téléchargez un fichier Excel (.xlsx) avec les colonnes suivantes:
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <h4 className="font-semibold text-sm">Colonnes obligatoires:</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>Nom FR</li>
                <li>Description FR</li>
                <li>Adresse FR</li>
                <li>Téléphone</li>
                <li>Type cuisine FR</li>
                <li>Prix moyen</li>
                <li>Horaires</li>
                <li>Latitude</li>
                <li>Longitude</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Colonnes optionnelles:</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>Nom EN</li>
                <li>Description EN</li>
                <li>Adresse EN</li>
                <li>Type cuisine EN</li>
                <li>Email</li>
                <li>Site web</li>
                <li>Statut (actif/inactif)</li>
              </ul>
            </div>
          </div>

          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm mb-4"
            disabled={loading}
          >
            Télécharger le template
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Fichier Excel</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>

        {loading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-1">Traitement: {progress}%</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
            {validationErrors.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={continueWithValidData}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm mr-2"
                >
                  Continuer avec les données valides
                </button>
                <button
                  onClick={() => {
                    setError('');
                    setValidationErrors([]);
                  }}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-red-700 mb-2">Détails des erreurs:</h4>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {validationErrors.slice(0, 10).map((error, index) => (
                <div key={index} className="text-sm text-red-600 mb-1 p-1 border-b">
                  <strong>Ligne {error.row}:</strong> {error.error}
                </div>
              ))}
              {validationErrors.length > 10 && (
                <div className="text-sm text-gray-500 text-center mt-2">
                  ... et {validationErrors.length - 10} erreurs supplémentaires
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}