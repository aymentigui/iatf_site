"use client";
import { ColumnSheetsImport } from "@/hooks/use-import-csv";
import { useTranslations } from "next-intl";

export function getColumns(): ColumnSheetsImport[] {
  const translate = useTranslations("sheet");
  return [
    { title: "nom_fr", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "nom_ar", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "nom_en", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "nom_es", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "nom_pt", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "description_fr", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "description_ar", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "description_en", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "description_es", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "description_pt", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "adresse_fr", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "adresse_ar", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "adresse_en", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "adresse_es", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "adress_pt", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    {
      title: "email",
      require: { req: false, message: translate("required") },
      type: { tp: "string", message: translate("invalidtext") },
      condition: [{ cond: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: translate("invalidemail") }],
    },
    { title: "telephone", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "site_web", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "etoiles", require: { req: false, message: translate("required") }, type: { tp: "number", message: translate("invalidnumber") }, condition: [] },
    { title: "prix_min", require: { req: false, message: translate("required") }, type: { tp: "number", message: translate("invalidnumber") }, condition: [] },
    { title: "prix_max", require: { req: false, message: translate("required") }, type: { tp: "number", message: translate("invalidnumber") }, condition: [] },

    { title: "latitude", require: { req: false, message: translate("required") }, type: { tp: "number", message: translate("invalidnumber") }, condition: [] },
    { title: "longitude", require: { req: false, message: translate("required") }, type: { tp: "number", message: translate("invalidnumber") }, condition: [] },

    { title: "services_fr", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "services_ar", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "services_en", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "services_es", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "services_pt", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "statut", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "zone_fr", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "zone_ar", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "zone_en", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "zone_es", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "zone_pt", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "quai_fr", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "quai_ar", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "quai_en", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "quai_es", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
    { title: "quai_pt", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },

    { title: "distance", require: { req: false, message: translate("required") }, type: { tp: "number", message: translate("invalidnumber") }, condition: [] },
    { title: "tempestimer", require: { req: false, message: translate("required") }, type: { tp: "string", message: translate("invalidtext") }, condition: [] },
  ];
}
