import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { PHONE_DISPLAY, PHONE_HREF } from '../../constants/contact';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

/**
 * Catches render-time errors anywhere below it and shows a minimal, dependency-
 * free fallback instead of a blank page. The fallback deliberately avoids i18n,
 * CSS classes and app state (any of which could be what failed) and keeps the
 * phone CTA reachable so a broken render never costs a lead.
 *
 * In the healthy state it renders its children verbatim (no wrapper element),
 * so it adds nothing to the DOM and never breaks hydration of the prerender.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Stripped from production bundles by esbuild (drop: ['console']), but
    // invaluable in dev and in the console of a reproducing browser.
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#1a2332',
          background: '#f5f5f0',
        }}
      >
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Coś poszło nie tak / Что-то пошло не так
        </h1>
        <p style={{ maxWidth: '32rem', margin: 0, lineHeight: 1.6, color: '#555' }}>
          Przepraszamy za usterkę. Odśwież stronę lub zadzwoń do nas - pomożemy od ręki.
          <br />
          Извините за сбой. Обновите страницу или позвоните нам.
        </p>
        <div
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: '1px solid #1a2332',
              background: '#1a2332',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Odśwież / Обновить
          </button>
          <a
            href={PHONE_HREF}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: '1px solid #b8943e',
              background: '#b8943e',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
