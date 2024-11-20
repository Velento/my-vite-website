import React from 'react';
import { useTranslation } from 'react-i18next';
import './Menu.css';

const Menu = () => {
  const { t } = useTranslation();

  return (
    <nav className="menu">
      <ul>
        <li><a href="#pricelist">{t('menu.pricelist')}</a></li>
        <li><a href="#advantages">{t('menu.advantages')}</a></li>
        <li><a href="#promotions">{t('menu.promotions')}</a></li>
        <li><a href="#services">{t('menu.services')}</a></li>
        <li><a href="#about">{t('menu.about')}</a></li>
        <li><a href="#footer">{t('menu.contact')}</a></li>
        <li><a href="#leedform">{t('menu.feedback')}</a></li>
      </ul>
    </nav>
  );
};

export default Menu;