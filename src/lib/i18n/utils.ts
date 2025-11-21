import type { IntlShape } from 'react-intl';

/**
 * Convert Western numerals (0-9) to Arabic-Indic numerals (٠-٩)
 */
export const toArabicNumerals = (str: string): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/\d/g, (d) => arabicNumerals[+d]);
};

/**
 * Format a numeric string for display based on language
 */
export const formatNumericValue = (
  value: string,
  language: 'en' | 'ar',
  intl: IntlShape
): string => {
  const num = parseInt(value, 10);
  return language === 'ar' ? intl.formatNumber(num) : value;
};

/**
 * Flatten nested translation objects for react-intl
 */
export const flattenMessages = (
  nestedMessages: Record<string, any>,
  prefix = ''
): Record<string, string> => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {} as Record<string, string>);
};
