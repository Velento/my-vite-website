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
  "relative pb-1 text-[0.85rem] font-medium uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[var(--color-accent)] after:transition-[width] after:duration-200 hover:after:w-full max-lg:text-[0.8rem]";

const verticalLink =
  'flex w-full items-center justify-center rounded-md px-6 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)] transition-colors duration-200 hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)] active:bg-[var(--color-bg-subtle)]';

const Menu = ({ vertical = false, onItemClick }: MenuProps) => {
  const { t } = useTranslation();

  if (vertical) {
    return (
      <nav className="w-full">
        <ul className="flex w-full flex-col items-stretch gap-1 list-none m-0 p-0">
          {MENU_ITEMS.map(({ href, key }) => (
            <li key={key}>
              <a href={href} className={verticalLink} onClick={onItemClick}>
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="hidden justify-center bg-[var(--color-bg)] py-[var(--space-md)] px-[var(--content-padding)] md:flex">
      <ul className="flex list-none gap-12 lg:gap-6">
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
