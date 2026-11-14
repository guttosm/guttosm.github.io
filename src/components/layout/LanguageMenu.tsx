import { useId, useRef, useState, type FocusEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { LOCALE_CODES, LOCALE_QUERY_PARAM, LOCALES, type Locale } from '../../i18n/locales';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/Icon';
import { IconButton } from '../ui/IconButton';
import './LanguageMenu.css';

/** A globe button that opens the list of languages. */
export function LanguageMenu() {
  const { locale, setLocale, messages } = useI18n();
  const [, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  useEscapeKey(() => close(true), open);
  useClickOutside([containerRef], () => close(false), open);

  // Close when keyboard focus moves past the list
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  const choose = (code: Locale) => {
    setLocale(code);
    // Put the choice in the address bar, so the current link opens in this language
    setSearchParams(
      (params) => {
        params.set(LOCALE_QUERY_PARAM, code);
        return params;
      },
      { replace: true },
    );
    close(true);
  };

  return (
    <div className="language-menu" ref={containerRef} onBlur={onBlur}>
      <IconButton
        ref={buttonRef}
        icon="globe"
        label={`${messages.a11y.language}: ${LOCALES[locale].name}`}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      />
      <ul id={listId} className="language-menu-list" aria-label={messages.a11y.language} hidden={!open}>
        {LOCALE_CODES.map((code) => {
          const current = code === locale;
          return (
            <li key={code}>
              <button
                type="button"
                lang={LOCALES[code].htmlLang}
                aria-current={current ? 'true' : undefined}
                onClick={() => choose(code)}
              >
                <span>{LOCALES[code].name}</span>
                {current && <Icon name="check" size={16} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
