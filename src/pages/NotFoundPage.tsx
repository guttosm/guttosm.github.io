import { ButtonRouterLink } from '../components/ui/ButtonLink';
import { useLinkTo } from '../hooks/useLinkTo';
import { usePageTitle } from '../hooks/usePageTitle';
import { useI18n } from '../i18n/useI18n';
import './NotFoundPage.css';

export function NotFoundPage() {
  const { messages } = useI18n();
  const linkTo = useLinkTo();
  const copy = messages.notFound;
  usePageTitle(copy.title);

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found-inner">
        <h1 id="not-found-title">{copy.title}</h1>
        <p className="not-found-text">{copy.text}</p>
        <ButtonRouterLink to={linkTo('/')} iconStart="arrow" className="not-found-home">
          {copy.home}
        </ButtonRouterLink>
      </div>
    </section>
  );
}
