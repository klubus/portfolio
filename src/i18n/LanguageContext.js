import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

const getInitialLang = () => {
  const stored = localStorage.getItem('lang');
  return stored === 'pl' || stored === 'en' ? stored : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const lookup = (dict, key) =>
    key.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), dict);

  const t = (key) => {
    const value = lookup(translations[lang], key);
    return value != null ? value : lookup(translations.en, key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
