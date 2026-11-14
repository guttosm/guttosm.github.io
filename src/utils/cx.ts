/** Joins the truthy class names: cx('card', isOpen && 'open') → 'card open'. */
export function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ');
}
