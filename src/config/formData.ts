/**
 * Form data configuration
 * Contains static dropdown options and form field data
 *
 * Note: These values are currently frontend-only. In a production environment,
 * some of these (like emirates, marital status options) could be fetched from
 * a backend API to allow for dynamic updates without code deployment.
 */

// Gender options
export const GENDER_OPTIONS = ['male', 'female'] as const;

// GCC Countries configuration
export interface CountryConfig {
  code: string;
  name: string;
  phoneCode: string;
  phoneFormat: string; // Display format hint
  phoneMaxLength: number;
  regions: readonly string[];
  regionLabelKey: string; // i18n key for region label (emirate, province, etc.)
  cities: Record<string, readonly string[]>; // Cities per region
  idLabelKey: string; // i18n key for ID label (Emirates ID, National ID, etc.)
  idPlaceholderKey: string; // i18n key for ID placeholder
  idPattern: RegExp; // Validation pattern for ID
  idMaxLength: number; // Max length for ID input (including formatting chars)
}

export const GCC_COUNTRIES: Record<string, CountryConfig> = {
  UAE: {
    code: 'UAE',
    name: 'United Arab Emirates',
    phoneCode: '+971',
    phoneFormat: '+971 XX XXX XXXX',
    phoneMaxLength: 17,
    regions: [
      'Abu Dhabi',
      'Dubai',
      'Sharjah',
      'Ajman',
      'Umm Al Quwain',
      'Ras Al Khaimah',
      'Fujairah',
    ],
    regionLabelKey: 'form.steps.personal.fields.emirate',
    cities: {
      'Abu Dhabi': ['Abu Dhabi City', 'Al Ain', 'Al Dhafra', 'Al Shamkha', 'Khalifa City', 'Mussafah'],
      'Dubai': ['Dubai City', 'Jebel Ali', 'Al Barsha', 'Deira', 'Bur Dubai', 'Jumeirah'],
      'Sharjah': ['Sharjah City', 'Al Dhaid', 'Kalba', 'Khor Fakkan', 'Dibba Al Hisn'],
      'Ajman': ['Ajman City', 'Al Manama', 'Masfout'],
      'Umm Al Quwain': ['Umm Al Quwain City', 'Falaj Al Mualla'],
      'Ras Al Khaimah': ['Ras Al Khaimah City', 'Al Jazirah Al Hamra', 'Khatt', 'Digdaga'],
      'Fujairah': ['Fujairah City', 'Dibba Al Fujairah', 'Masafi', 'Al Bidiyah'],
    },
    idLabelKey: 'form.steps.personal.fields.emiratesId',
    idPlaceholderKey: 'form.steps.personal.fields.placeholders.emiratesId',
    idPattern: /^\d{3}-\d{4}-\d{7}-\d{1}$/,
    idMaxLength: 18, // 15 digits + 3 dashes
  },
  SAU: {
    code: 'SAU',
    name: 'Saudi Arabia',
    phoneCode: '+966',
    phoneFormat: '+966 XX XXX XXXX',
    phoneMaxLength: 17,
    regions: [
      'Riyadh',
      'Makkah',
      'Madinah',
      'Eastern Province',
      'Asir',
      'Tabuk',
      'Hail',
      'Northern Borders',
      'Jazan',
      'Najran',
      'Al Bahah',
      'Al Jawf',
      'Qassim',
    ],
    regionLabelKey: 'form.steps.personal.fields.province',
    cities: {
      'Riyadh': ['Riyadh City', 'Al Kharj', 'Al Diriyah', 'Al Majmaah', 'Wadi Al Dawasir'],
      'Makkah': ['Makkah City', 'Jeddah', 'Taif', 'Rabigh', 'Al Qunfudhah'],
      'Madinah': ['Madinah City', 'Yanbu', 'Al Ula', 'Khaybar', 'Badr'],
      'Eastern Province': ['Dammam', 'Dhahran', 'Al Khobar', 'Al Ahsa', 'Jubail', 'Qatif'],
      'Asir': ['Abha', 'Khamis Mushait', 'Bisha', 'Al Namas'],
      'Tabuk': ['Tabuk City', 'Duba', 'Haql', 'Umluj'],
      'Hail': ['Hail City', 'Baqaa', 'Al Ghazalah'],
      'Northern Borders': ['Arar', 'Rafha', 'Turaif'],
      'Jazan': ['Jazan City', 'Sabya', 'Abu Arish', 'Samtah'],
      'Najran': ['Najran City', 'Sharourah', 'Hubuna'],
      'Al Bahah': ['Al Bahah City', 'Baljurashi', 'Al Mandaq'],
      'Al Jawf': ['Sakaka', 'Dumat Al Jandal', 'Qurayyat'],
      'Qassim': ['Buraydah', 'Unaizah', 'Al Rass', 'Al Bukayriyah'],
    },
    idLabelKey: 'form.steps.personal.fields.nationalId',
    idPlaceholderKey: 'form.steps.personal.fields.placeholders.nationalId',
    idPattern: /^\d{10}$/,
    idMaxLength: 10,
  },
  QAT: {
    code: 'QAT',
    name: 'Qatar',
    phoneCode: '+974',
    phoneFormat: '+974 XXXX XXXX',
    phoneMaxLength: 14,
    regions: [
      'Doha',
      'Al Rayyan',
      'Al Wakrah',
      'Al Khor',
      'Al Shamal',
      'Al Daayen',
      'Umm Salal',
      'Al Shahaniya',
    ],
    regionLabelKey: 'form.steps.personal.fields.municipality',
    cities: {
      'Doha': ['Doha City', 'West Bay', 'The Pearl', 'Al Sadd', 'Al Waab', 'Al Gharrafa'],
      'Al Rayyan': ['Al Rayyan City', 'Education City', 'Al Wajba', 'Muaither'],
      'Al Wakrah': ['Al Wakrah City', 'Mesaieed', 'Al Wukair'],
      'Al Khor': ['Al Khor City', 'Al Thakira', 'Ras Laffan'],
      'Al Shamal': ['Madinat Al Shamal', 'Al Ruwais', 'Abu Dhalouf'],
      'Al Daayen': ['Lusail', 'Al Kheesa', 'Simaisma'],
      'Umm Salal': ['Umm Salal Mohammed', 'Umm Salal Ali'],
      'Al Shahaniya': ['Al Shahaniya City', 'Dukhan'],
    },
    idLabelKey: 'form.steps.personal.fields.qatarId',
    idPlaceholderKey: 'form.steps.personal.fields.placeholders.qatarId',
    idPattern: /^\d{11}$/,
    idMaxLength: 11,
  },
  BHR: {
    code: 'BHR',
    name: 'Bahrain',
    phoneCode: '+973',
    phoneFormat: '+973 XXXX XXXX',
    phoneMaxLength: 14,
    regions: [
      'Capital Governorate',
      'Northern Governorate',
      'Southern Governorate',
      'Muharraq Governorate',
    ],
    regionLabelKey: 'form.steps.personal.fields.governorate',
    cities: {
      'Capital Governorate': ['Manama', 'Juffair', 'Adliya', 'Seef', 'Diplomatic Area'],
      'Northern Governorate': ['Budaiya', 'Diraz', 'Janabiyah', 'Saar', 'Barbar'],
      'Southern Governorate': ['Riffa', 'Isa Town', 'Awali', 'Zallaq', 'Durrat Al Bahrain'],
      'Muharraq Governorate': ['Muharraq City', 'Hidd', 'Busaiteen', 'Galali', 'Amwaj Islands'],
    },
    idLabelKey: 'form.steps.personal.fields.cpr',
    idPlaceholderKey: 'form.steps.personal.fields.placeholders.cpr',
    idPattern: /^\d{9}$/,
    idMaxLength: 9,
  },
} as const;

// Country codes array for validation
export const GCC_COUNTRY_CODES = Object.keys(GCC_COUNTRIES) as (keyof typeof GCC_COUNTRIES)[];

// Helper function to get country config
export const getCountryConfig = (countryCode: string): CountryConfig | undefined => {
  return GCC_COUNTRIES[countryCode];
};

// Helper function to get regions for a country
export const getRegionsForCountry = (countryCode: string): readonly string[] => {
  return GCC_COUNTRIES[countryCode]?.regions || [];
};

// Helper function to get cities for a region within a country
export const getCitiesForRegion = (countryCode: string, region: string): readonly string[] => {
  return GCC_COUNTRIES[countryCode]?.cities[region] || [];
};

// UAE Emirates list (for backward compatibility)
export const UAE_EMIRATES = GCC_COUNTRIES.UAE.regions;

// Marital status options
export const MARITAL_STATUS_OPTIONS = [
  'single',
  'married',
  'divorced',
  'widowed',
] as const;

// Employment status options
export const EMPLOYMENT_STATUS_OPTIONS = [
  'employed',
  'selfEmployed',
  'unemployed',
  'retired',
  'student',
] as const;

// Housing status options
export const HOUSING_STATUS_OPTIONS = [
  'owned',
  'rented',
  'family-owned',
  'government',
  'other',
] as const;
