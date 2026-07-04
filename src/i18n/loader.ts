import type { Locale } from './config';

import en from './locales/en.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';

const translations = { en, ja, ru } as const;

export type Translations = typeof en;

export function getTranslations(locale: Locale): Translations {
  return translations[locale] as Translations;
}

export { translations };
