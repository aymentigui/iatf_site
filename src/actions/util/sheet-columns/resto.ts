"use client";
import { ColumnSheetsImport } from "@/hooks/use-import-csv";
import { useTranslations } from "next-intl";

export function getColumns(): ColumnSheetsImport[] {
     const translate = useTranslations("sheet")
    return [
        {
            title: "nomfr",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "nomar",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "nomen",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "nomes",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "nompt",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },


        {
            title: "descriptionfr",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "descriptionar",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "descriptionen",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "descriptiones",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "descriptionpt",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },




        {
            title: "adressefr",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "adressear",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "adresseen",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "adressees",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "adressept",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },




        {
            title: "email",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [
                { cond: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: translate("invalidemail") },
            ],
        },

        {
            title: "telephone",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "site_web",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },


        {
            title: "type_cuisinefr",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "type_cuisinear",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "type_cuisineen",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "type_cuisinees",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "type_cuisinept",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },

        {
            title: "prix_moyen",
            require: { req: false,  },
            type: { tp: "number", message: translate("invalidnumber") },
            condition: [],
        },
        {
            title: "horaires_ouverture",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "latitude",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "longitude",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },



        {
            title: "specialitesfr",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "specialitesar",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "specialitesen",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "specialiteses",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },
        {
            title: "specialitespt",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },

        {
            title: "status",
            require: { req: false,  },
            type: { tp: "string", message: translate("invalidtext") },
            condition: [],
        },

        
    ];
}

