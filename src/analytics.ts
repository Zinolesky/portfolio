import { track } from '@vercel/analytics';

type EventProperties = Record<string, string | number | boolean>;

/**
 * Safely records a custom analytics event via Vercel Web Analytics.
 * Fails silently if analytics scripts are blocked by the visitor's browser.
 */
export function trackEvent(name: string, properties?: EventProperties): void {
  try {
    track(name, properties);
  } catch {
    // Ignore errors when analytics is blocked or unavailable locally
  }
}

/**
 * Records a unique session visit once per browser tab session.
 */
export function trackSessionVisit(): void {
  try {
    const key = 'portfolio_session_tracked';
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    trackEvent('portfolio_visit', {
      referrer: document.referrer || 'direct',
    });
  } catch {
    // Ignore storage/analytics errors in restricted environments
  }
}
