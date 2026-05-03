import { useTranslation } from 'react-i18next';

const MENU_ITEMS = [
  { href: '#pricelist', key: 'menu.pricelist' },
  { href: '#advantages', key: 'menu.advantages' },
  { href: '#promotions', key: 'menu.promotions' },
  { href: '#services', key: 'menu.services' },
  { href: '#about', key: 'menu.about' },
  { href: '#footer', key: 'menu.contact' },
  { href: '#leedform', key: 'menu.feedback' },
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
  'group flex w-full items-center justify-between rounded-md px-5 py-3.5 text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary)] transition-[background-color,color,padding] duration-200 hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)] hover:pl-6 active:bg-[var(--color-bg-subtle)]';

const Menu = ({ vertical = false, onItemClick }: MenuProps) => {
  const { t } = useTranslation();

  if (vertical) {
    return (
      <nav className="w-full">
        <ul className="m-0 flex w-full list-none flex-col items-stretch gap-0.5 p-0">
          {MENU_ITEMS.map(({ href, key }) => (
            <li key={key}>
              <a href={href} className={verticalLink} onClick={onItemClick}>
                <span>{t(key)}</span>
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
