import { useEffect } from 'react';
import { profile } from '../data/profile';
import { useI18n } from '../i18n/useI18n';

/** Sets the browser tab title: "<page> · <name>", or the site title on the home page. */
export function usePageTitle(page?: string) {
  const { messages } = useI18n();
  const title = page ? `${page} · ${profile.name}` : messages.meta.title;

  useEffect(() => {
    document.title = title;
  }, [title]);
}
