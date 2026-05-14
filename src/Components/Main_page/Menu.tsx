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
  // Premium nav link: balanced padding, underline that grows from the center,
  // and a subtle icon scale on hover. The underline `left-1/2 -translate-x-1/2`
  // keeps the growing bar visually centered under each item — looks tidier
  // than the old left-anchored animation.
  "group relative inline-flex items-center gap-2 py-2.5 px-2 text-[0.875rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-accent)] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[var(--color-accent)] after:transition-[width] after:duration-300 hover:after:w-[calc(100%-1rem)] max-lg:text-[0.75rem] max-lg:tracking-[0.08em] max-lg:gap-1.5";

const verticalLink =
  'group grid w-full grid-cols-[40px_1fr_24px] items-center gap-3 rounded-lg px-4 py-3.5 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)] transition-[background-color,color,transform] duration-200 hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)] active:scale-[0.98] active:bg-[var(--color-bg-subtle)]';

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
                  className="flex h-9 w-9 items-center justify-center justify-self-start rounded-md bg-[var(--color-bg-alt)] text-[var(--color-accent)] transition-colors duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-white [&>svg]:h-[18px] [&>svg]:w-[18px]"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                {/* Centered label — middle column. The icon stays on the left
                    edge but visually balances the trailing arrow on the right. */}
                <span className="text-center">{t(key)}</span>
                <span
                  className="justify-self-end text-[var(--color-accent)] opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
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
    <nav
      className={[
        // Hidden on mobile (replaced by Burger). On md+ becomes the main nav.
        'hidden md:block w-full',
        'border-b border-[var(--color-border-light)]',
        'bg-gradient-to-b from-white to-[var(--color-bg-alt)]',
        'shadow-[0_1px_0_rgba(0,0,0,0.02)]',
      ].join(' ')}
      aria-label="Main navigation"
    >
      {/* Outer flex container centers the inline-flex list. Using inline-flex
          on the <ul> means it sizes to its content (not max-width), so items
          form a tight centered group instead of stretching edge-to-edge. */}
      <div className="flex w-full justify-center px-[var(--content-padding)] py-3">
        <ul
          className={[
            'm-0 inline-flex list-none flex-wrap items-center justify-center',
            'gap-x-7 gap-y-1 lg:gap-x-8 xl:gap-x-10 max-lg:gap-x-5',
            'max-w-full p-0',
          ].join(' ')}
        >
          {MENU_ITEMS.map(({ href, key, icon }) => (
            <li key={key}>
              <a href={href} className={horizontalLink} onClick={onItemClick}>
                <span
                  className="inline-flex h-[18px] w-[18px] align-[-3px] text-[var(--color-accent)] transition-transform duration-200 group-hover:scale-110 [&>svg]:h-full [&>svg]:w-full"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span>{t(key)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
