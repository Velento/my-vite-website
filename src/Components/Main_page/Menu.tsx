import { useTranslation } from 'react-i18next';
import type { ReactElement } from 'react';

// Inline SVG icons — small, sharp, currentColor-friendly. One per category
// so the mobile slide-out menu has a clear visual hierarchy.
const Icon = {
  price: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  star: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  gift: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
  briefcase: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  info: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  send: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
} satisfies Record<string, ReactElement>;

const MENU_ITEMS = [
  { href: '#pricelist', key: 'menu.pricelist', icon: Icon.price },
  { href: '#advantages', key: 'menu.advantages', icon: Icon.star },
  { href: '#promotions', key: 'menu.promotions', icon: Icon.gift },
  { href: '#services', key: 'menu.services', icon: Icon.briefcase },
  { href: '#about', key: 'menu.about', icon: Icon.users },
  { href: '#footer', key: 'menu.contact', icon: Icon.info },
  { href: '#leedform', key: 'menu.feedback', icon: Icon.send },
] as const;

type MenuProps = {
  /** When true, renders as a vertical column (used inside the mobile burger panel). */
  vertical?: boolean;
  /** Optional callback fired when an item is clicked — used to close the burger panel. */
  onItemClick?: () => void;
};

const horizontalLink =
  "relative inline-block py-2 px-1 text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-accent)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[var(--color-accent)] after:transition-[width] after:duration-300 hover:after:w-full max-lg:text-[0.85rem] max-lg:tracking-wider";

const verticalLink =
  'group flex w-full items-center gap-4 rounded-lg px-4 py-3.5 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)] transition-[background-color,color,transform] duration-200 hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)] active:scale-[0.98] active:bg-[var(--color-bg-subtle)]';

const Menu = ({ vertical = false, onItemClick }: MenuProps) => {
  const { t } = useTranslation();

  if (vertical) {
    return (
      <nav className="w-full">
        <ul className="m-0 flex w-full list-none flex-col items-stretch gap-1 p-0">
          {MENU_ITEMS.map(({ href, key, icon }) => (
            <li key={key}>
              <a href={href} className={verticalLink} onClick={onItemClick}>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-bg-alt)] text-[var(--color-accent)] transition-colors duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-white [&>svg]:h-[18px] [&>svg]:w-[18px]"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="flex-1 text-left">{t(key)}</span>
                <span
                  className="text-[var(--color-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="hidden md:block border-b border-[var(--color-border-light)] bg-gradient-to-b from-white to-[var(--color-bg-alt)] shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <ul className="mx-auto flex max-w-[var(--max-width)] list-none items-center justify-center gap-10 px-[var(--content-padding)] py-3 lg:gap-6">
        {MENU_ITEMS.map(({ href, key }) => (
          <li key={key}>
            <a href={href} className={horizontalLink} onClick={onItemClick}>
              {t(key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
