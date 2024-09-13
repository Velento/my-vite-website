
import React, { useState } from 'react';
import './MainPageSections.css';
import { useTranslation } from 'react-i18next';
import ContactModal from './ContactModal';
import kateFoto from '../images/Kate.png'; 
import sectionMoney from '../images/section_money.svg';
import sectionService from '../images/section_service.svg';
import sectionPlan from '../images/section_plan.svg';
import icon1 from '../images/icon1.svg'; // Замените на нужную иконку

const MainPageSections = () => {
  const { t } = useTranslation();
  
  const Section = ({ title, content, imgSrc, iconSrc, buttonText, buttonLink }) => {
    const [showContactModal, setShowContactModal] = useState(false);

    const handleShowModal = () => setShowContactModal(true);
    const handleCloseModal = () => setShowContactModal(false);

    return (
      <div className="section">
        <h3>{title}</h3>
        {iconSrc && <img src={iconSrc} alt={`${title} icon`} className="section-icon" />}
        <div className="section-content">
          <p>{content}</p>
          {imgSrc && <img src={imgSrc} alt="Section" className="kate_foto" />}
        </div>
        {buttonLink ? (
          <a href={buttonLink} target="_blank" rel="noopener noreferrer">
            <button>{buttonText}</button>
          </a>
        ) : (
          <button className="button-i-want" onClick={handleShowModal}>{buttonText}</button>
        )}
        
        <ContactModal show={showContactModal} onClose={handleCloseModal} />
      </div>
    );
  };

  return (
    <div>
      {/* Новая секция, которая не будет частью колонок */}
      <div className="benefits-intro" id="advantages">
        <h2 className="benefits-h2">Какие выгоды для вас?</h2>
        <div className="benefit-item">
          <img src={icon1} alt="Иконка" className="benefit-icon" />
          <strong className="benefits-reasons-strong">Доступная цена.</strong>
          <p className="benefits-answers-p">Доступность цен мы считаем самым главным критерием в нашей работе. У нас всегда есть акции на популярные услуги, которые вы сможете посмотреть на данном сайте.</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Иконка" className="benefit-icon" />
          <strong className="benefits-reasons-strong">Оплата в РАССРОЧКУ по 100 зл. в месяц.</strong>
          <p className="benefits-answers-p">Если вам удобнее оплачивать услугу поэтапно, то вы можете оформить рассрочку на 8 месяцев. При этом месячная оплата составит всего лишь 100 злотых.</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Иконка" className="benefit-icon" />
          <strong className="benefits-reasons-strong">Возврат денежных средств.</strong>
          <p className="benefits-answers-p">Если по нашей вине вам дадут отказ в выдаче карты побыту, то мы возвращаем вам всю сумму. Кроме того, если мы все сделали правильно, но по какой-то причине вам отказали в карте, то мы бесплатно подадим апелляцию или сделаем вам новую карту побыту бесплатно.</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Иконка" className="benefit-icon" />
          <strong className="benefits-reasons-strong">Общение в Ужонде за вас на польском языке.</strong>
          <p className="benefits-answers-p">При заключении договора с нами, вы не будете посещать Ужонд. Мы сами проведем переговоры на польском языке, напишем письма должностным лицам, подадим жалобу или иск в суд.</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Иконка" className="benefit-icon" />
          <strong className="benefits-reasons-strong">Мы всегда на связи.</strong>
          <p className="benefits-answers-p">Вы можете быть спокойны, так как все вопросы по легализации мы берем на себя. Однако, если у вас возникнет вопрос, вы всегда можете прийти к нам в офис или позвонить. Наши контакты и режим работы указаны на сайте.</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Иконка" className="benefit-icon" />
          <strong className="benefits-reasons-strong">Предоставляем доступ к личному кабинету.</strong>
          <p className="benefits-answers-p">Если вы хотите сами контролировать статус вашего дела, то мы предоставим вам доступ к личному кабинету на государственном сайте Ужонда.</p>
        </div>
      </div>

      {/* Секции с другими преимуществами */}
      <div className="main-page-sections">
        <div className="left-column">
          <Section
            title={t('section1.title')}
            content={t('section1.content')}
            iconSrc={sectionMoney}
            buttonText={t('section1.buttonText')}
          />
          <Section
            title={t('section2.title')}
            content={t('section2.content')}
            iconSrc={sectionService}
            buttonText={t('section2.buttonText')}
          />
                 {/* <Section
          title={t('section3.title')}
          content={t('section3.content')}
          iconSrc={sectionGame}
          buttonText={t('section3.buttonText')}
          buttonLink="https://www.instagram.com/legal_line_pl/"
        /> */}
        </div>
        <div className="right-column">
          <Section
            title={t('section4.title')}
            imgSrc={kateFoto}
            content={t('section4.content')}
            buttonText={t('section4.buttonText')}
          />
          {/* <Section
            title={t('section5.title')}
            content={t('section5.content')}
            iconSrc={sectionPlan}
            buttonText={t('section5.buttonText')}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MainPageSections;
