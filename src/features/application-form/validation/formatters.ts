import { GCC_COUNTRIES } from '@/config/formData';

/**
 * Format UAE Emirates ID: 784-XXXX-XXXXXXX-X (15 digits with dashes)
 */
export const formatEmiratesId = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';
  if (digits.length > 0) {
    formatted = digits.substring(0, 3);
  }
  if (digits.length >= 4) {
    formatted += '-' + digits.substring(3, 7);
  }
  if (digits.length >= 8) {
    formatted += '-' + digits.substring(7, 14);
  }
  if (digits.length >= 15) {
    formatted += '-' + digits.substring(14, 15);
  }
  return formatted;
};

/**
 * Format Saudi National ID: XXXXXXXXXX (10 digits, no formatting needed)
 */
export const formatSaudiId = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 10);
};

/**
 * Format Qatar ID: XXXXXXXXXXX (11 digits, no formatting needed)
 */
export const formatQatarId = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 11);
};

/**
 * Format Bahrain CPR: XXXXXXXXX (9 digits, no formatting needed)
 */
export const formatBahrainCpr = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 9);
};

/**
 * Format National ID based on country code
 * - UAE: 784-XXXX-XXXXXXX-X (formatted with dashes)
 * - SAU: XXXXXXXXXX (10 digits)
 * - QAT: XXXXXXXXXXX (11 digits)
 * - BHR: XXXXXXXXX (9 digits)
 */
export const formatNationalId = (value: string, countryCode: string): string => {
  switch (countryCode) {
    case 'UAE':
      return formatEmiratesId(value);
    case 'SAU':
      return formatSaudiId(value);
    case 'QAT':
      return formatQatarId(value);
    case 'BHR':
      return formatBahrainCpr(value);
    default:
      return value.replace(/\D/g, '');
  }
};

/**
 * Format phone number based on country code
 * UAE/SAU: +XXX XX XXX XXXX
 * QAT/BHR: +XXX XXXX XXXX
 */
export const formatGCCPhone = (value: string, countryCode: string): string => {
  const countryConfig = GCC_COUNTRIES[countryCode];
  if (!countryConfig) return value;

  const phoneCode = countryConfig.phoneCode;
  const phoneCodeDigits = phoneCode.replace('+', '');

  // Remove all non-digit and non-plus characters
  let cleaned = value.replace(/[^\d+]/g, '');

  // Handle different input formats
  if (!cleaned.startsWith(phoneCode)) {
    if (cleaned.startsWith(phoneCodeDigits)) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      cleaned = phoneCode + cleaned.substring(1);
    } else if (cleaned.length > 0 && cleaned[0] !== '+') {
      cleaned = phoneCode + cleaned;
    }
  }

  // Format based on country
  if (cleaned.startsWith(phoneCode)) {
    const digits = cleaned.substring(phoneCode.length);
    let formatted = phoneCode;

    if (countryCode === 'UAE' || countryCode === 'SAU') {
      // Format: +XXX XX XXX XXXX
      if (digits.length > 0) {
        formatted += ' ' + digits.substring(0, 2);
      }
      if (digits.length > 2) {
        formatted += ' ' + digits.substring(2, 5);
      }
      if (digits.length > 5) {
        formatted += ' ' + digits.substring(5, 9);
      }
    } else if (countryCode === 'QAT' || countryCode === 'BHR') {
      // Format: +XXX XXXX XXXX
      if (digits.length > 0) {
        formatted += ' ' + digits.substring(0, 4);
      }
      if (digits.length > 4) {
        formatted += ' ' + digits.substring(4, 8);
      }
    }

    return formatted;
  }

  return cleaned;
};

// Backward compatibility - UAE phone formatter
export const formatUAEPhone = (value: string): string => {
  return formatGCCPhone(value, 'UAE');
};
