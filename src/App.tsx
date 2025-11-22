import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from './app/providers/AppProvider';
import { LanguageProvider } from './app/providers/LanguageProvider';
import { AppRouter } from './app/router/AppRouter';
import { useRTL } from './hooks/useRTL';

function AppContent() {
  const { dir } = useRTL();

  return (
    <div className="min-h-screen" dir={dir}>
      <Toaster
        position="top-center"
        dir={dir}
        toastOptions={{
          style: {
            background: '#fff',
            color: '#3F3E45',
            border: '1px solid #E0E0E1',
            borderRadius: '0.5rem',
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
