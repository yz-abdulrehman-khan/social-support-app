export type Language = 'en' | 'ar';

// Convert numbers to Arabic numerals
export const toArabicNumerals = (num: number | string): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
};

// Format number based on language
export const formatNumber = (num: number | string, language: Language): string => {
  return language === 'ar' ? toArabicNumerals(num) : String(num);
};

const translations = {
  en: {
    // Header
    login: "Login",
    signup: "Sign Up",
    
    // Landing Page
    heroTitle: "Financial Assistance Application Portal",
    heroSubtitle: "Access government financial support securely and with dignity.",
    startApplication: "Start Your Application",
    
    // Features
    featuresTitle: "Why Apply Through Our Portal",
    feature1Title: "Secure & Confidential",
    feature1Desc: "Your personal information is protected with government-grade security.",
    feature2Title: "Fast Processing",
    feature2Desc: "Applications are reviewed promptly to provide timely assistance.",
    feature3Title: "Easy to Use",
    feature3Desc: "Simple step-by-step process with helpful guidance throughout.",
    feature4Title: "AI Writing Help",
    feature4Desc: "Get assistance describing your situation with our AI-powered tool.",
    
    // Eligibility
    eligibilityTitle: "Am I Eligible?",
    eligibilityIntro: "You may qualify for financial assistance if you meet any of the following criteria:",
    eligibilityCriteria: [
      "UAE National or legal resident facing temporary financial hardship",
      "Family income below the established threshold",
      "Unemployed and actively seeking employment",
      "Medical emergency causing financial strain",
      "Supporting dependents with special needs",
      "Affected by natural disaster or unforeseen circumstances"
    ],
    eligibilityNote: "Don't worry if you're unsure - our team will review all applications fairly and compassionately.",
    
    // Process Steps
    processTitle: "How It Works",
    step1: "Fill Application",
    step1Desc: "Complete the secure online form with your details",
    step2: "Review & Submit",
    step2Desc: "Review your information and submit your application",
    step3: "Receive Confirmation",
    step3Desc: "Get instant confirmation and track your application status",
    
    // Form Navigation
    home: "Home",
    journeys: "Journeys",
    financialAssistance: "Financial Assistance Application",
    questions: "Questions",
    previous: "Previous",
    next: "Next",
    cancel: "Cancel",
    reviewSubmit: "Review & Submit",
    lastSaved: "Last saved",
    
    // Footer
    emergencyNumbers: "Emergency Numbers",
    viewAllNumbers: "View All Numbers",
    police: "Police",
    ambulance: "Ambulance",
    civilDefence: "Civil Defence",
    serviceForIndividuals: "Service for Individuals",
    serviceForBusiness: "Service for Business",
    support: "Support",
    aboutUs: "About Us",
    helpTopics: "Help Topics",
    privacyPolicy: "Privacy Policy",
    fileComplaint: "File a Complaint",
    reportBug: "Report a Bug",
    giveSuggestion: "Give a Suggestion",
    shareCompliment: "Share a Compliment",
    provideFeedback: "Provide Feedback",
    whatIsTAMM: "What is TAMM",
    tammServices: "TAMM Services",
    tammCases: "TAMM Cases",
    findServiceCenters: "Find TAMM Service Centers",
    copyright: "© 2025 Abu Dhabi Government. All rights reserved.",
    
    // Need Help Section
    needHelp: "Need Help?",
    needHelpDesc: "Our support team is available 24/7 to assist you. Contact us through chat, phone, or visit a service center.",
    findServiceCenter: "Find Service Center",
    contactSupport: "Contact Support",
    
    // Step 1
    step1Title: "Personal Information",
    step1Subtitle: "Please provide your basic personal details as they appear on your Emirates ID.",
    fullNameEnglish: "Full Name (English)",
    fullNameArabic: "Full Name (Arabic)",
    emiratesId: "Emirates ID Number",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    selectGender: "Select gender",
    male: "Male",
    female: "Female",
    nationality: "Nationality",
    phoneNumber: "Phone Number",
    email: "Email Address",
    street: "Street Address",
    city: "City",
    emirate: "Emirate",
    country: "Country",
    postalCode: "Postal Code",
    
    // Step 2
    step2Title: "Family & Financial Details",
    step2Subtitle: "Help us understand your household situation and financial circumstances.",
    maritalStatus: "Marital Status",
    selectMaritalStatus: "Select marital status",
    single: "Single",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widowed",
    numberOfDependents: "Number of Dependents",
    monthlyIncome: "Monthly Household Income (AED)",
    employmentStatus: "Employment Status",
    selectEmploymentStatus: "Select employment status",
    employed: "Employed",
    unemployed: "Unemployed",
    selfEmployed: "Self-Employed",
    retired: "Retired",
    student: "Student",
    housingStatus: "Housing Status",
    selectHousingStatus: "Select housing status",
    owned: "Owned",
    rented: "Rented",
    familyHousing: "Family Housing",
    governmentHousing: "Government Housing",
    other: "Other",
    
    // Step 3
    step3Title: "Situation Description",
    step3Subtitle: "Please describe your current situation. The more details you provide, the better we can assess your needs.",
    assistanceType: "Type of Assistance Needed",

    // Step 4
    step4Title: "Review & Confirm",
    step4Subtitle: "Please review all your information carefully before submitting. You can edit any section by clicking the Edit button.",
    editSection: "Edit",
    personalInfo: "Personal Information",
    contactInfo: "Contact Information",
    addressInfo: "Address Information",
    familyFinancialInfo: "Family & Financial Details",
    situationInfo: "Situation Description",
    submitApplication: "Submit Application",
    confirmSubmit: "Are you sure you want to submit this application? Please review all information carefully.",
    selectAssistanceType: "Select assistance type",
    financialSupport: "Financial Support",
    medicalAssistance: "Medical Assistance",
    housingSupport: "Housing Support",
    educationSupport: "Education Support",
    emergencyRelief: "Emergency Relief",
    describeYourSituation: "Describe Your Situation",
    situationPlaceholder: "Please explain your current circumstances and why you are seeking assistance. Be as detailed as possible.",
    helpMeWrite: "Help Me Write",
    supportingDocuments: "Supporting Documents",
    uploadDocuments: "Upload documents",
    uploadHint: "Upload any supporting documents (Emirates ID, medical records, bills, etc.)",
    declaration: "Declaration",
    declarationText: "I declare that all information provided in this application is true and accurate to the best of my knowledge.",
    
    // Validation Messages
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    invalidEmiratesId: "Please enter a valid Emirates ID (e.g., 784-1234-1234567-1)",

    // Success Page
    successTitle: "Application Successfully Submitted",
    successMessage: "Your financial assistance application has been received and is now being reviewed.",
    yourReferenceNumber: "Your Reference Number",
    saveReferenceNumber: "Please save this number for tracking your application",
    downloadConfirmation: "Download Confirmation",
    emailConfirmation: "Email Confirmation",
    whatHappensNext: "What Happens Next?",
    returnToHome: "Return to Home",
    applicationReview: "Application Review",
    applicationReviewDesc: "Your application will be reviewed within 5-7 business days.",
    eligibilityAssessment: "Eligibility Assessment",
    eligibilityAssessmentDesc: "We will assess your eligibility based on the information provided.",
    decisionNotification: "Decision Notification",
    decisionNotificationDesc: "You will receive a notification via email and SMS.",
    supportDisbursement: "Support Disbursement",
    supportDisbursementDesc: "If approved, assistance will be processed and disbursed.",
    importantInformation: "Important Information",
    checkEmail: "Check your email regularly for updates on your application status",
    trackApplication: "You can track your application status using your reference number",
    additionalDocuments: "If you need to provide additional documents, you will be contacted directly",
    urgentInquiries: "For urgent inquiries, contact our support center at 800-TAMM (8266)",
  },
  ar: {
    // Header
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    
    // Landing Page
    heroTitle: "بوابة طلب المساعدة المالية",
    heroSubtitle: "احصل على الدعم المالي الحكومي بأمان وكرامة.",
    startApplication: "ابدأ طلبك",
    
    // Features
    featuresTitle: "لماذا التقديم من خلال بوابتنا",
    feature1Title: "آمن وسري",
    feature1Desc: "معلوماتك الشخصية محمية بأمان من الدرجة الحكومية.",
    feature2Title: "معالجة سريعة",
    feature2Desc: "تتم مراجعة الطلبات بسرعة لتقديم المساعدة في الوقت المناسب.",
    feature3Title: "سهل الاستخدام",
    feature3Desc: "عملية بسيطة خطوة بخطوة مع إرشادات مفيدة طوال الوقت.",
    feature4Title: "مساعدة الكتابة بالذكاء الاصطناعي",
    feature4Desc: "احصل على مساعدة في وصف حالتك باستخدام أداة الذكاء الاصطناعي.",
    
    // Eligibility
    eligibilityTitle: "هل أنا مؤهل؟",
    eligibilityIntro: "قد تكون مؤهلاً للحصول على المساعدة المالية إذا كنت تستوفي أيًا من المعايير التالية:",
    eligibilityCriteria: [
      "مواطن إماراتي أو مقيم قانوني يواجه صعوبات مالية مؤقتة",
      "دخل الأسرة أقل من الحد المقرر",
      "عاطل عن العمل ويبحث بنشاط عن عمل",
      "حالة طبية طارئة تسبب ضائقة مالية",
      "إعالة معالين من ذوي الاحتياجات الخاصة",
      "متأثر بكارثة طبيعية أو ظروف غير متوقعة"
    ],
    eligibilityNote: "لا تقلق إذا لم تكن متأكدًا - سيقوم فريقنا بمراجعة جميع الطلبات بإنصاف وتعاطف.",
    
    // Process Steps
    processTitle: "كيف يعمل",
    step1: "املأ الطلب",
    step1Desc: "أكمل النموذج الآمن عبر الإنترنت بتفاصيلك",
    step2: "مراجعة وإرسال",
    step2Desc: "مراجعة معلوماتك وإرسال طلبك",
    step3: "تلقي التأكيد",
    step3Desc: "احصل على تأكيد فوري واتباع حالة طلبك",
    
    // Form Navigation
    home: "الرئيسية",
    journeys: "الرحلات",
    financialAssistance: "طلب المساعدة المالية",
    questions: "الأسئلة",
    previous: "السابق",
    next: "التالي",
    cancel: "إلغاء",
    reviewSubmit: "مراجعة وإرسال",
    lastSaved: "آخر حفظ",
    
    // Footer
    emergencyNumbers: "أرقام الطوارئ",
    viewAllNumbers: "عرض جميع الأرقام",
    police: "شرطة",
    ambulance: "طوارئ طبية",
    civilDefence: "دفاع المدني",
    serviceForIndividuals: "خدمات الأفراد",
    serviceForBusiness: "خدمات الشركات",
    support: "الدعم",
    aboutUs: "معلومات عنا",
    helpTopics: "مواضيع المساعدة",
    privacyPolicy: "سياسة الخصوصية",
    fileComplaint: "تقديم شكوى",
    reportBug: "الإبلاغ عن خطأ",
    giveSuggestion: "تقديم اقتراح",
    shareCompliment: "مشاركة إعجاب",
    provideFeedback: "تقديم تعليق",
    whatIsTAMM: "ما هو TAMM",
    tammServices: "خدمات TAMM",
    tammCases: "قضايا TAMM",
    findServiceCenters: "إيجاد مراكز خدمات TAMM",
    copyright: "© ٢٠٢٥ الحكومة أبو ظبي. جميع الحقوق محفوظة.",

    // Need Help Section
    needHelp: "تحتاج إلى مساعدة؟",
    needHelpDesc: "فريق الدعم متاح ٢٤/٧ لمساعدتك. اتصل بنا عبر الدردشة، الهاتف، أو زيارة مركز خدمة.",
    findServiceCenter: "إيجاد مركز خدمة",
    contactSupport: "اتصال الدعم",
    
    // Step 1
    step1Title: "المعلومات الشخصية",
    step1Subtitle: "يرجى تقديم تفاصيلك الشخصية الأساسية كما تظهر في هويتك الإماراتية.",
    fullNameEnglish: "الاسم الكامل (بالإنجليزية)",
    fullNameArabic: "الاسم الكامل (بالعربية)",
    emiratesId: "رقم الهوية الإماراتية",
    dateOfBirth: "تاريخ الميلاد",
    gender: "الجنس",
    selectGender: "اختر الجنس",
    male: "ذكر",
    female: "أنثى",
    nationality: "الجنسية",
    phoneNumber: "رقم الهاتف",
    email: "البريد الإلكتروني",
    street: "عنوان الشارع",
    city: "المدينة",
    emirate: "الإمارة",
    country: "الدولة",
    postalCode: "الرمز البريدي",
    
    // Step 2
    step2Title: "تفاصيل الأسرة والمالية",
    step2Subtitle: "ساعدنا في فهم وضع أسرتك وظروفك المالية.",
    maritalStatus: "الحالة الاجتماعية",
    selectMaritalStatus: "اختر الحالة الاجتماعية",
    single: "أعزب",
    married: "متزوج",
    divorced: "مطلق",
    widowed: "أرمل",
    numberOfDependents: "عدد المعالين",
    monthlyIncome: "الدخل الشهري للأسرة (درهم)",
    employmentStatus: "حالة التوظيف",
    selectEmploymentStatus: "اختر حالة التوظيف",
    employed: "موظف",
    unemployed: "عاطل عن العمل",
    selfEmployed: "يعمل لحسابه الخاص",
    retired: "متقاعد",
    student: "طالب",
    housingStatus: "وضع السكن",
    selectHousingStatus: "اختر وضع السكن",
    owned: "مملوك",
    rented: "مستأجر",
    familyHousing: "سكن عائلي",
    governmentHousing: "سكن حكومي",
    other: "أخرى",
    
    // Step 3
    step3Title: "وصف الحالة",
    step3Subtitle: "يرجى وصف وضعك الحالي. كلما قدمت تفاصيل أكثر، كلما تمكنا من تقييم احتياجاتك بشكل أفضل.",
    assistanceType: "نوع المساعدة المطلوبة",

    // Step 4
    step4Title: "مراجعة وتأكيد",
    step4Subtitle: "يرجى مراجعة جميع معلوماتك بعناية قبل الإرسال. يمكنك تعديل أي قسم بالنقر على زر تعديل.",
    editSection: "تعديل",
    personalInfo: "المعلومات الشخصية",
    contactInfo: "معلومات الاتصال",
    addressInfo: "معلومات العنوان",
    familyFinancialInfo: "تفاصيل الأسرة والمالية",
    situationInfo: "وصف الحالة",
    submitApplication: "إرسال الطلب",
    confirmSubmit: "هل أنت متأكد أنك تريد إرسال هذا الطلب؟ يرجى مراجعة جميع المعلومات بعناية.",
    selectAssistanceType: "اختر نوع المساعدة",
    financialSupport: "دعم مالي",
    medicalAssistance: "مساعدة طبية",
    housingSupport: "دعم سكني",
    educationSupport: "دعم تعليمي",
    emergencyRelief: "إغاثة طارئة",
    describeYourSituation: "صف حالتك",
    situationPlaceholder: "يرجى شرح ظروفك الحالية وسبب طلبك للمساعدة. كن مفصلاً قدر الإمكان.",
    helpMeWrite: "ساعدني في الكتابة",
    supportingDocuments: "المستندات الداعمة",
    uploadDocuments: "تحميل المستندات",
    uploadHint: "قم بتحميل أي مستندات داعمة (الهوية الإماراتية، السجلات الطبية، الفواتير، إلخ)",
    declaration: "إقرار",
    declarationText: "أقر بأن جميع المعلومات المقدمة في هذا الطلب صحيحة ودقيقة على حد علمي.",
    
    // Validation Messages
    required: "هذا الحقل مطلوب",
    invalidEmail: "يرجى إدخال بريد إلكتروني صالح",
    invalidPhone: "يرجى إدخال رقم هاتف صالح",
    invalidEmiratesId: "يرجى إدخال رقم هوية إماراتية صالح (مثال: ٧٨٤-١٢٣٤-١٢٣٤٥٦٧-١)",

    // Success Page
    successTitle: "تم إرسال الطلب بنجاح",
    successMessage: "تم استلام طلب المساعدة المالية الخاص بك وهو قيد المراجعة الآن.",
    yourReferenceNumber: "رقم المرجع الخاص بك",
    saveReferenceNumber: "يرجى حفظ هذا الرقم لتتبع طلبك",
    downloadConfirmation: "تحميل التأكيد",
    emailConfirmation: "إرسال التأكيد بالبريد الإلكتروني",
    whatHappensNext: "ماذا يحدث بعد ذلك؟",
    returnToHome: "العودة إلى الصفحة الرئيسية",
    applicationReview: "مراجعة الطلب",
    applicationReviewDesc: "سيتم مراجعة طلبك خلال ٥-٧ أيام عمل.",
    eligibilityAssessment: "تقييم الأهلية",
    eligibilityAssessmentDesc: "سنقوم بتقييم أهليتك بناءً على المعلومات المقدمة.",
    decisionNotification: "إشعار القرار",
    decisionNotificationDesc: "ستتلقى إشعارًا عبر البريد الإلكتروني والرسائل القصيرة.",
    supportDisbursement: "صرف الدعم",
    supportDisbursementDesc: "في حالة الموافقة، سيتم معالجة وصرف المساعدة المالية.",
    importantInformation: "معلومات مهمة",
    checkEmail: "تحقق من بريدك الإلكتروني بانتظام للحصول على تحديثات حول حالة طلبك",
    trackApplication: "يمكنك تتبع حالة طلبك باستخدام رقم المرجع الخاص بك",
    additionalDocuments: "إذا كنت بحاجة إلى تقديم مستندات إضافية، فسيتم الاتصال بك مباشرة",
    urgentInquiries: "للاستفسارات العاجلة، اتصل بمركز الدعم لدينا على ٨٠٠-TAMM (٨٢٦٦)",
  }
};

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, language: Language): string {
  return translations[language][key] as string;
}

export function tArray(key: TranslationKey, language: Language): string[] {
  return translations[language][key] as string[];
}