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

export const formatUAEPhone = (value: string): string => {
  let cleaned = value.replace(/[^\d+]/g, '');

  if (!cleaned.startsWith('+971')) {
    if (cleaned.startsWith('971')) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      cleaned = '+971' + cleaned.substring(1);
    } else if (cleaned.length > 0 && cleaned[0] !== '+') {
      cleaned = '+971' + cleaned;
    }
  }

  if (cleaned.startsWith('+971')) {
    const digits = cleaned.substring(4);
    let formatted = '+971';

    if (digits.length > 0) {
      formatted += ' ' + digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += ' ' + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      formatted += ' ' + digits.substring(5, 9);
    }

    return formatted;
  }

  return cleaned;
};
