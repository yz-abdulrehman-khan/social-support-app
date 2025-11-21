import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from './app/providers/AppProvider';
import { LanguageProvider, useLanguage } from './app/providers/LanguageProvider';
import { AppRouter } from './app/router/AppRouter';

function AppContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Toaster
        position="top-center"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        toastOptions={{
          style: {
            background: '#fff',
            color: '#3F3E45',
            border: '1px solid #E0E0E1',
          },
        }}
      />
      <AppRouter />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
