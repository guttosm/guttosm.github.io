import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, type To } from 'react-router';
import { cx } from '../../utils/cx';
import { Icon, type IconName } from './Icon';
import './ButtonLink.css';

interface ButtonStyleProps {
  variant?: 'primary' | 'secondary';
  iconStart?: IconName;
  iconEnd?: IconName;
}

function ButtonContent({ iconStart, iconEnd, children }: Omit<ButtonStyleProps, 'variant'> & { children: ReactNode }) {
  return (
    <>
      {iconStart && <Icon name={iconStart} size={16} />}
      {children}
      {iconEnd && <Icon name={iconEnd} size={16} />}
    </>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ButtonStyleProps {
  href: string;
  /** Opens in a new tab, for links that leave the site. */
  external?: boolean;
}

/** A link to a file or another site, styled as a button. It stays a real <a>, so it opens in new tabs. */
export function ButtonLink({
  variant = 'primary',
  iconStart,
  iconEnd,
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const externalProps = external ? { target: '_blank', rel: 'noreferrer' } : {};
  return (
    <a className={cx('button', `button-${variant}`, className)} {...externalProps} {...rest}>
      <ButtonContent iconStart={iconStart} iconEnd={iconEnd}>
        {children}
      </ButtonContent>
    </a>
  );
}

interface ButtonRouterLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, ButtonStyleProps {
  to: To;
}

/** A link to another page of this site, styled as a button. */
export function ButtonRouterLink({
  to,
  variant = 'primary',
  iconStart,
  iconEnd,
  className,
  children,
  ...rest
}: ButtonRouterLinkProps) {
  return (
    <Link to={to} className={cx('button', `button-${variant}`, className)} {...rest}>
      <ButtonContent iconStart={iconStart} iconEnd={iconEnd}>
        {children}
      </ButtonContent>
    </Link>
  );
}
