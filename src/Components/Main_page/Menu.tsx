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

const linkClass =
  // animated underline on hover via after pseudo-element
  "relative pb-1 text-[0.85rem] font-medium uppercase tracking-wider text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[var(--color-accent)] after:transition-[width] after:duration-200 hover:after:w-full max-lg:text-[0.8rem]";

type MenuProps = {
  /** When true, renders as a vertical column (used inside the mobile burger panel). */
  vertical?: boolean;
};

const Menu = ({ vertical = false }: MenuProps) => {
  const { t } = useTranslation();

  const navClass = vertical
    ? 'flex w-full justify-center'
    : 'hidden justify-center bg-[var(--color-bg)] py-[var(--space-md)] px-[var(--content-padding)] md:flex';

  const ulClass = vertical
    ? 'flex flex-col items-center list-none gap-6'
    : 'flex list-none gap-12 lg:gap-6';

  return (
    <nav className={navClass}>
      <ul className={ulClass}>
        {MENU_ITEMS.map(({ href, key }) => (
          <li key={key}>
            <a href={href} className={linkClass}>
              {t(key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
