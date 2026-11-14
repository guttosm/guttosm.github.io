import { useLocation, type To } from 'react-router';

/** Builds in-app link targets that keep the current query string, so a ?lang= choice follows the visitor. */
export function useLinkTo(): (pathname: string) => To {
  const { search } = useLocation();
  return (pathname) => ({ pathname, search });
}
