import './Header.css';
import Logo from './Logo';
import Contacts from './Contacts';
import LanguageSwitcher from './LanguageSwitcher';
import Burger from './Burger';

function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="header-center">
        <a href="tel:+48883734171" className="header-phone">
          +48 883 734 171
        </a>
      </div>
      <div className="header-right">
        <Contacts />
        <LanguageSwitcher />
        <Burger />
      </div>
    </header>
  );
}

export default Header;
