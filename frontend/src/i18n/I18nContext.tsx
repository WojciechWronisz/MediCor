import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, type Lang } from './translations';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)['pl'];
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = 'medicor-lang';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved === 'en' || saved === 'ru' || saved === 'pl' ? saved : 'pl';
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', translations[lang].metaDescription);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
