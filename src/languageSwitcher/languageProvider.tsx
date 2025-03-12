import { useCallback, useMemo, useState } from 'react';
import languageCtx from './languageContext';

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(localStorage.getItem('selectedLanguage') || 'en');

  const setLanguage = useCallback((newLanguage: string) => {
    localStorage.setItem('selectedLanguage', newLanguage);
    setLanguageState(newLanguage);
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <languageCtx.Provider value={value}>{children}</languageCtx.Provider>;
}

export default LanguageProvider;
