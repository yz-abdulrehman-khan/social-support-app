import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-theme-light px-4">
          <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg border border-theme text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-theme-primary mb-2">
                Something went wrong
              </h1>
              <p className="text-sm text-theme-secondary mb-6">
                We encountered an unexpected error. Please try reloading the page.
              </p>
            </div>

            {this.state.error && import.meta.env.DEV && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
                <p className="text-xs font-mono text-red-600 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full px-6 h-11 font-medium transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="w-full border border-theme-accent text-theme-accent hover:bg-theme-light rounded-full px-6 h-11 font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
