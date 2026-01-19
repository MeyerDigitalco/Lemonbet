import Config from "../../utils/config";

const LANG = Config.localStoragePrefix + "lang";

class LangStorage {
  static getLang() {
    const s = localStorage.getItem(LANG);
    if (s !== null) return JSON.parse(s);
    return null;
  }

  static setLang(lang) {
    localStorage.setItem(LANG, JSON.stringify(lang));
  }
}

export default LangStorage;
