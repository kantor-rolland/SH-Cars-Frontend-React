import { createContext } from 'react';

// szuksegunk van egy contextre, hogy barhonnan eltudjuk erni a kivalasztott nyelvet
export type LanguageCtxType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageCtx = createContext<LanguageCtxType>(null!);

export default LanguageCtx;
