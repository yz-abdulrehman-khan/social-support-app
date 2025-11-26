import { LANGUAGES, type Language } from '@/features/application-form/types';

/**
 * Convert Western numerals (0-9) to Arabic-Indic numerals (٠-٩)
 */
export const toArabicNumerals = (str: string): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/\d/g, (d) => arabicNumerals[+d]);
};

/**
 * Format a numeric value for display based on language using Intl.NumberFormat
 * Supports both regular numbers and currency formatting
 */
export const formatNumericValue = (
  value: string | number,
  language: Language,
  options?: Intl.NumberFormatOptions
): string => {
  // Parse the value to a number
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Return empty string if invalid
  if (isNaN(num)) {
    return '';
  }

  // Use appropriate locale
  const locale = language === LANGUAGES.AR ? 'ar-AE' : 'en-US';

  // Format using Intl.NumberFormat
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    ...options,
  }).format(num);
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
