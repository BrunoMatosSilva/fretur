export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fretur.com.br").replace(/\/$/, "");

export const SITE_NAME = "Fretur Fretamento e Turismo";

export const SITE_DESCRIPTION =
  "Fretur oferece transporte executivo, transfer para aeroportos, fretamento para eventos, turismo e viagens em grupo com conforto, segurança e pontualidade em São Paulo.";

export const WHATSAPP_NUMBER = "5511977452500";
export const WHATSAPP_DEFAULT_MSG = "Olá! Vim pelo site da Fretur e gostaria de solicitar um orçamento.";

export const SANITY = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o6bfdhz4",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2024-10-01",
  /** Tipo do documento de notícia no Studio */
  postType: process.env.SANITY_POST_TYPE || "post",
};
