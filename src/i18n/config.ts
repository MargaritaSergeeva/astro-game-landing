export const supportedLocales = ['en', 'ru', 'ja'] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'en';

export const localeStorageKey = 'twilighthaven:locale';

export const localeMeta: Record<Locale, { label: string; shortLabel: string }> = {
  en: { label: 'English', shortLabel: 'EN' },
  ru: { label: 'Русский', shortLabel: 'RU' },
  ja: { label: '日本語', shortLabel: 'JA' },
};

export function getLocalizedPath(locale: Locale, section?: string): string {
  const hash = section ? `#${section.replace(/^#/, '')}` : '';

  return `/${locale}/${hash}`;
}
