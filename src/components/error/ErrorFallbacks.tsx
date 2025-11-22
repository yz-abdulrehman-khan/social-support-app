import { useIntl } from 'react-intl';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { useRTL } from '@/hooks/useRTL';

export function LanguageError() {
  const { dir } = useRTL();

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <TammHeader />
      <div className="flex-1 flex items-center justify-center bg-theme-light px-4">
        <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg border border-theme text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-theme-primary mb-2">
            Language Loading Error
          </h1>
          <p className="text-sm text-theme-secondary mb-6">
            Failed to load language resources. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full px-6 h-11 font-medium transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
      <TammFooter />
    </div>
  );
}

export function AppError() {
  const intl = useIntl();
  const { dir } = useRTL();

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <TammHeader />
      <div className="flex-1 flex items-center justify-center bg-theme-light px-4">
        <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg border border-theme text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-theme-primary mb-2">
            {intl.formatMessage({ id: 'error.app.title' })}
          </h1>
          <p className="text-sm text-theme-secondary mb-6">
            {intl.formatMessage({ id: 'error.app.message' })}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full px-6 h-11 font-medium transition-colors"
            >
              {intl.formatMessage({ id: 'error.app.returnHome' })}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full border border-theme-accent text-theme-accent hover:bg-theme-light rounded-full px-6 h-11 font-medium transition-colors"
            >
              {intl.formatMessage({ id: 'error.app.reload' })}
            </button>
          </div>
        </div>
      </div>
      <TammFooter />
    </div>
  );
}
