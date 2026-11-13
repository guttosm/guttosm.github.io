import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="mono">200 OK · thanks for visiting</span>
      </div>
    </footer>
  );
}
