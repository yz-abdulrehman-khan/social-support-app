import type { core } from 'zod';
import type { IntlShape } from 'react-intl';

export const makeZodI18nMap = (intl: IntlShape): core.$ZodErrorMap => {
  return (issue: core.$ZodRawIssue) => {
    if (issue.message && issue.message.includes('.')) {
      return { message: intl.formatMessage({ id: issue.message }) };
    }

    switch (issue.code) {
      case 'invalid_type':
        return { message: intl.formatMessage({ id: 'validation.required' }) };

      case 'too_small':
        if (issue.origin === 'string' && issue.minimum === 1) {
          return { message: intl.formatMessage({ id: 'validation.required' }) };
        }
        if (issue.origin === 'string' && issue.minimum > 1) {
          return {
            message: intl.formatMessage(
              { id: 'validation.minLength' },
              { min: issue.minimum.toString() }
            )
          };
        }
        return { message: intl.formatMessage({ id: 'validation.required' }) };

      case 'invalid_format':
      case 'custom':
      default:
        return undefined;
    }
  };
};
