import { useTheme } from '../../hooks/useTheme';
import { useI18n } from '../../i18n/useI18n';
import { IconButton } from '../ui/IconButton';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { messages } = useI18n();
  const isDark = theme === 'dark';

  return (
    <IconButton
      icon={isDark ? 'sun' : 'moon'}
      label={isDark ? messages.a11y.switchToLight : messages.a11y.switchToDark}
      onClick={toggleTheme}
    />
  );
}
