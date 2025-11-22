# 🏛️ Abu Dhabi Financial Assistance Portal

<div align="center">

**Production-ready bilingual government portal with AI-powered features**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?logo=openai)](https://openai.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [API](#-api)

</div>

---

## 🌟 Overview

Modern, accessible web application for financial assistance applications featuring:
- **4-step form wizard** with progress tracking
- **AI-powered** writing assistance and auto-translation
- **Full bilingual support** (English/Arabic with RTL)
- **Responsive design** for all devices

---

## ✨ Features

### Core Functionality
- ✅ Multi-step form with validation
- ✅ AI writing assistant (GPT-3.5)
- ✅ Auto-translation (English ↔ Arabic)
- ✅ Manual save/restore progress
- ✅ Unsaved changes detection
- ✅ Auto-formatting (Emirates ID, phone)
- ✅ Character counters with validation


### Internationalization
- ✅ 287 translation strings
- ✅ RTL layout for Arabic
- ✅ Arabic numerals (٠-٩)
- ✅ Localized date picker
- ✅ Language switching without data loss

### Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Focus management

---

## 📸 Screenshots

> **Note:** Screenshots are being added. English interface screenshots are provided below. Arabic interface screenshots will be added soon.

### English Interface

**Landing Page**
![Landing Page](./screenshots/en-landing.png)
*Hero section with features and call-to-action*

**Form Step 1: Personal Information**
![Personal Information](./screenshots/en-step1.png)
*Personal details with auto-translation for names*

**Form Step 2: Family & Financial Details**
![Family & Financial](./screenshots/en-step2.png)
*Household and income information*

**Form Step 3: Situation Description**
![Situation Description](./screenshots/en-step3.png)
*AI-powered writing assistance for situation details*

**AI Writing Assistant Modal**
![AI Assistant - Empty](./screenshots/en-ai-modal-empty.png)
*Initial state of AI writing helper*

![AI Assistant - Generated](./screenshots/en-ai-modal-generated.png)
*AI-generated professional text*

![AI Assistant - Loading](./screenshots/en-ai-modal-loading.png)
*Text generation in progress*

**Form Step 4: Review & Confirm**
![Review & Confirm](./screenshots/en-step4.png)
*Complete application review before submission*

**Success Confirmation**
![Success Page](./screenshots/en-success.png)
*Reference number and next steps*

**Form Validation**
![Validation Errors](./screenshots/en-validation.png)
*Real-time field validation*

### Arabic Interface (RTL)

> Arabic screenshots will be added to match all English interface screens above.

<!-- Arabic screenshots placeholders -->
<!-- ./screenshots/ar-landing.png - الصفحة الرئيسية -->
<!-- ./screenshots/ar-step1.png - الخطوة ١: المعلومات الشخصية -->
<!-- ./screenshots/ar-step2.png - الخطوة ٢: المعلومات العائلية والمالية -->
<!-- ./screenshots/ar-step3.png - الخطوة ٣: وصف الوضع -->
<!-- ./screenshots/ar-ai-modal.png - مساعد الكتابة بالذكاء الاصطناعي -->
<!-- ./screenshots/ar-step4.png - الخطوة ٤: المراجعة والتأكيد -->
<!-- ./screenshots/ar-success.png - تأكيد الإرسال الناجح -->

### Responsive Design

> Responsive design screenshots (mobile, tablet, desktop) will be added.

<!-- Responsive screenshots placeholders -->
<!-- ./screenshots/mobile.png - Mobile view (320px+) -->
<!-- ./screenshots/tablet.png - Tablet view (768px+) -->
<!-- ./screenshots/desktop.png - Desktop view (1024px+) -->

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/social-support-app.git
cd social-support-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start development servers
npm run dev          # Frontend (http://localhost:5173)
npm run dev:server   # Backend (http://localhost:3001)
```

### Environment Variables

Create `.env` in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=3001
```

---

## 📁 Project Structure

```
social-support-app/
├── src/
│   ├── app/                    # App shell
│   │   ├── providers/          # Context providers
│   │   └── router/             # Route management
│   ├── features/               # Feature modules
│   │   ├── landing/            # Landing page
│   │   ├── application-form/   # Multi-step form
│   │   │   ├── components/     # Form steps
│   │   │   ├── hooks/          # Form logic
│   │   │   └── validation/     # Zod schemas
│   │   └── success/            # Confirmation page
│   ├── components/             # Shared components
│   │   ├── ui/                 # Radix UI primitives
│   │   ├── layout/             # Layout components
│   │   └── ErrorBoundary.tsx   # Error handling
│   ├── lib/                    # Utilities
│   │   ├── secureStorage.ts    # AES encryption
│   │   └── i18n.ts             # i18n utilities
│   ├── services/               # External services
│   │   └── aiService.ts        # OpenAI integration
│   ├── locales/                # Translations
│   │   ├── en.json             # English (287 strings)
│   │   └── ar.json             # Arabic (287 strings)
│   └── config/                 # Configuration
├── server/                     # Express backend
│   ├── index.ts                # API server
│   └── routes/                 # API routes
└── public/                     # Static assets
```

---

## 🏗️ Architecture

### Frontend
- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **React Hook Form** - Form state
- **Zod** - Validation
- **React Intl** - i18n

### Backend
- **Express 5.1** - Web framework
- **Helmet.js** - Security headers
- **CORS** - Cross-origin requests
- **Rate Limiting** - DoS protection

### State Management
```
AppProvider (Global)
  ├── LanguageProvider (i18n)
  └── FormWizard (Form state)
      └── useFormWizard (Logic)
```

### Error Handling
```
ErrorBoundary (Root)
  └── LanguageProvider
      └── ErrorBoundary (Language)
          └── AppProvider
              └── ErrorBoundary (App)
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19.2, TypeScript 5.9, Vite 7.2 |
| **Styling** | Tailwind CSS v4, CSS Variables |
| **UI Components** | Radix UI, Custom components |
| **Forms** | React Hook Form, Zod validation |
| **i18n** | React Intl (287 strings) |
| **AI** | OpenAI GPT-3.5-turbo |
| **Backend** | Express 5.1, Node.js 18+ |

---

## 📡 API Documentation

### Backend Endpoints

#### POST `/api/ai/assist`
Generate AI text for situation descriptions

**Request:**
```json
{
  "prompt": "Help me write about my financial hardship",
  "language": "en",
  "context": "financialSituation"
}
```

**Response:**
```json
{
  "text": "I am currently experiencing financial difficulties due to..."
}
```

**Rate Limit:** 20 requests/minute per IP

**Error Codes:**
- `400` - Invalid request
- `429` - Rate limit exceeded
- `500` - Server error

#### POST `/api/ai/translate`
Translate text between English and Arabic

**Request:**
```json
{
  "text": "John Smith",
  "targetLanguage": "ar"
}
```

**Response:**
```json
{
  "translatedText": "جون سميث"
}
```

### Frontend API Service

```typescript
import { AIService } from '@/services/aiService';

// Generate AI text
const text = await AIService.generateText(prompt, language, context);

// Translate to Arabic
const arabic = await AIService.translateToArabic(englishText);

// Translate to English
const english = await AIService.translateToEnglish(arabicText);
```

---

## 🌍 Internationalization

### Supported Languages
- **English** (`en`) - Default
- **Arabic** (`ar`) - RTL support

### Translation Files
- `src/locales/en.json` - 287 strings
- `src/locales/ar.json` - 287 strings

### Adding Translations

1. Add key to both `en.json` and `ar.json`:
```json
// en.json
{
  "feature.newKey": "New Feature"
}

// ar.json
{
  "feature.newKey": "ميزة جديدة"
}
```

2. Use in components:
```tsx
import { useIntl } from 'react-intl';

const intl = useIntl();
const text = intl.formatMessage({ id: 'feature.newKey' });
```

### RTL Support
- Automatic layout flip in Arabic
- `dir="rtl"` attribute on root
- Tailwind RTL utilities
- Arabic numeral conversion (0-9 → ٠-٩)

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
```bash
git checkout -b feature/your-feature
```

2. Make changes and test
```bash
npm run dev        # Frontend
npm run dev:server # Backend
```

3. Commit changes
```bash
git add .
git commit -m "feat: your feature description"
```

4. Push and create PR
```bash
git push origin feature/your-feature
```

### Code Style
- **ESLint** - Linting
- **Prettier** - Formatting
- **TypeScript** - Type checking
- **Conventional Commits** - Commit messages

---

## 📄 License

Do whatever you want with it

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/your-org/social-support-app/issues)
- **Documentation:** This README
- **Email:** yz.abdulrehman.khan@gmail.com

---

<div align="center">

**Built with ❤️ for Abu Dhabi Government Services**

[⬆ Back to Top](#️-abu-dhabi-financial-assistance-portal)

</div>
