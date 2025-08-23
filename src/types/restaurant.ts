// types/restaurant.ts
export interface Restaurant {
  id: number;
  nomFR: string;
  nomEN?: string;
  descriptionFR: string;
  descriptionEN?: string;
  adresseFR: string;
  adresseEN?: string;
  telephone: string;
  email?: string;
  site_web?: string;
  type_cuisineFR: string;
  type_cuisineEN?: string;
  prix_moyen: number;
  horaires_ouverture: string;
  latitude: number;
  longitude: number;
  statut: 'actif' | 'inactif';
  date_creation: Date;
  date_modification: Date;
}

export type ViewMode = 'card' | 'list';

export interface Restaurant2 {
  id: number;
  nomfr: string | null;
  nomar: string | null;
  nomen: string | null;
  nomes: string | null;
  nompt: string | null;
  descriptionfr: string | null;
  descriptionen: string | null;
  descriptionar: string | null;
  descriptiones: string | null;
  descriptionpt: string | null;
  adressefr: string | null;
  adresseen: string | null;
  adressear: string | null;
  adressees: string | null;
  adressept: string | null;
  telephone: string | null;
  email: string | null;
  site_web: string | null;
  type_cuisinefr: string | null;
  type_cuisineen: string | null;
  type_cuisinear: string | null;
  type_cuisinees: string | null;
  type_cuisinept: string | null;
  prix_moyen: number | null;
  horaires_ouverture: string | null;
  latitude: number | null;
  longitude: number | null;
  image_id: string | null;
  specialitesfr: string | null;
  specialitesen: string | null;
  specialitesar: string | null;
  specialiteses: string | null;
  specialitespt: string | null;
  statut: string;
  date_creation: Date;
  date_modification: Date;
}