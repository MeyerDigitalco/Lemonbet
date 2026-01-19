import { enLang } from "./pack/enLang";
import { esLang } from "./pack/esLang";
import { ptLang } from "./pack/ptLang";

export const getLangPackByName = (lang) => {
  const normalizedLang = lang.toLowerCase();

  switch (normalizedLang) {
    case "pt":
      return ptLang;
    case "en":
      return enLang;
    case "es":
    default:
      return esLang;
  }
};
