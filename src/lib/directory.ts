// Directorio verificado. No agregar números sin verificar.
export type DirectoryEntry = {
  name: string;
  phone?: string;
  tel?: string; // formato tel: (internacional para que marque desde el exterior)
  url?: string; // alternativa a teléfono (enlace web como acción principal)
  urlLabel?: string;
  infoUrl?: string; // enlace secundario "Más info" debajo
  infoLabel?: string;
  detail?: string;
  highlight?: "urgent" | "primary";
};

export type DirectorySection = {
  title: string;
  entries: DirectoryEntry[];
};


export const DIRECTORY: DirectorySection[] = [
  {
    title: "Emergencia general",
    entries: [
      {
        name: "911",
        phone: "911",
        tel: "tel:911",
        detail: "Línea única nacional · 24/7 · solo dentro de Venezuela",
        highlight: "urgent",
      },
      {
        name: "Protección Civil nacional",
        phone: "0800-7248451",
        tel: "tel:+5808007248451",
      },
      {
        name: "Cruz Roja Venezolana",
        phone: "0422-7994880",
        tel: "tel:+584227994880",
        detail: "Reunificación familiar",
      },
    ],
  },
  {
    title: "Salud mental y crisis",
    entries: [
      {
        name: "Médicos Sin Fronteras",
        phone: "0414-0179925",
        tel: "tel:+584140179925",
        detail: "Trauma · 24/7 · gratuito",
        highlight: "primary",
      },
      {
        name: "Federación de Psicólogos de Venezuela",
        phone: "0212-4163116",
        tel: "tel:+582124163116",
        detail: "Primeros Auxilios Psicológicos · viernes a domingo",
      },
      {
        name: "Federación de Psicólogos · «SolidariaMente»",
        phone: "0424-1630117",
        tel: "tel:+584241630117",
        detail: "Apoyo grupal gratuito, online por Zoom",
      },
      {
        name: "Psicólogos sin Fronteras / Cesap",
        phone: "0424-2925604",
        tel: "tel:+584242925604",
        detail: "Duelo · WhatsApp",
      },
      {
        name: "UCAB PsicoLínea",
        phone: "0414-1217882",
        tel: "tel:+584141217882",
        detail: "Jueves de 8 a.m. a 5 p.m.",
      },
      {
        name: "Cecodap",
        phone: "0414-2696823",
        tel: "tel:+584142696823",
        detail: "Niños y adolescentes",
      },
      {
        name: "AVESA «Por Nosotras»",
        phone: "0424-1659742",
        tel: "tel:+584241659742",
        detail: "Mujeres · martes a sábado de 8 a.m. a 8 p.m.",
      },
    ],
  },
  {
    title: "Para venezolanos en el exterior",
    entries: [
      {
        name: "AASM · Asociación Argentina de Salud Mental",
        url: "https://www.aasm.org.ar",
        urlLabel: "aasm.org.ar",
        detail:
          "Capítulo de Psicología de las Emergencias · escucha gratuita y confidencial para venezolanos en Argentina · te contactan profesionales",
        highlight: "primary",
      },
      {
        name: "Comunidad de Madrid · 012 «A Tu Lado»",
        phone: "012",
        tel: "tel:012",
        detail:
          "Ayuda psicológica gratuita, 24 horas, para venezolanos en Madrid · con el Colegio Oficial de Psicología de Madrid · marca 012 desde Madrid",
        infoUrl: "https://c.madrid/al3op",
        infoLabel: "Más info",
        highlight: "primary",
      },
    ],
  },
  {
    title: "Protección Civil regional",
    entries: [
      {
        name: "Yaracuy",
        phone: "0254-8038742",
        tel: "tel:+582548038742",
      },
      {
        name: "Yaracuy (alterno)",
        phone: "0254-8037629",
        tel: "tel:+582548037629",
      },
    ],
  },
];
