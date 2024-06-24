// import React, { useState } from 'react';
// import './MainPageSections.css';
// import telegramIcon from '../images/telegram.png';
// import whatsappIcon from '../images/whatsapp.png';
// import viberIcon from '../images/viber.png';
// import kateFoto from '../images/Kate_foto1.jpg'; // Импортируем фотографию

// function openViberChat(e) {
//     e.preventDefault();
//     const viberUrl = "viber://chat?number=%2B375295817240";
//     const fallbackUrl = "https://www.viber.com/download/";
  
//     // Попытка открыть Viber
//     window.location.href = viberUrl;
  
//     // Если Viber не установлен, перенаправляем на fallback URL
//     setTimeout(() => {
//       if (!document.hasFocus()) {
//         return;
//       }
//       window.location.href = fallbackUrl;
//     }, 500);
// }

// const Modal = ({ show, onClose }) => {
//   if (!show) return null;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Выберите удобный тип связи</h2>
//         <p>Позвонить: <a href="tel:+48777888999">+48 777 888 999</a></p>
//         <div className="contact-icons">
//           <a href="https://t.me/katringoncharuk" target="_blank" rel="noopener noreferrer">
//             <img src={telegramIcon} alt="Telegram" className="contact-icon"/>
//           </a>
//           <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer">
//             <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
//           </a>
//           <a href="#!" onClick={openViberChat}>
//             <img src={viberIcon} alt="Viber" className="contact-icon" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Section = ({ title, content, imgSrc, buttonText, buttonLink }) => {
//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   return (
//     <div className="section">
//       <h3>{title}</h3>
//       <div className="section-content">
//         <p>{content}</p>
//         {imgSrc && <img src={imgSrc} alt="Section" className="kate_foto" />}
//       </div>
//       {buttonLink ? (
//         <a href={buttonLink} target="_blank" rel="noopener noreferrer">
//           <button>{buttonText}</button>
//         </a>
//       ) : (
//         <button className="button-i-want" onClick={handleShowModal}>{buttonText} </button>
//       )}
//       <Modal show={showModal} onClose={handleCloseModal} />
//     </div>
//   );
// };

// const MainPageSections = () => {
//   return (
//     <div className="main-page-sections">
//       <div className="left-column">
//         <Section
//           title="Доведем до результата или вернем деньги!"
//           content="Мы работаем по договору с гарантией возврата денег. Это значит, что если что-то пойдет не по плану и если по нашей вине ты не получишь конечного результата, то мы вернем тебе всю сумму за наши услуги."
//           buttonText="ХОЧУ ЗАКЛЮЧИТЬ ДОГОВОР"
//         />
//         <Section
//           title="Свяжись сейчас и узнай как решить твой вопрос максимально быстро!"
//           content="Свяжись с нами прямо сейчас! Смело задавай вопрос нашему специалисту. Мы ответим на него максимально быстро."
//           buttonText="ХОЧУ БЫСТРЫЙ ОТВЕТ"
//         />
//         <Section
//           title="Участвуй в розыгрыше пожизненной бесплатной юридической помощи. Розыгрыш каждый месяц"
//           content="Мы хотим дать максимально пользы с нашей стороны. Мы часто консультируем людей бесплатно. Однако многие нуждаются в оказании комплексной юридической помощи, на которую не всегда находятся финансы. Поэтому не упускай свой шанс! Ты можешь стать победителем розыгрыша в нашей группе Инстаграм. Подписывайся и играй!"
//           buttonText="ХОЧУ БЕСПЛАТНУЮ ЮРИДИЧЕСКУЮ ПОМОЩЬ НА ВСЮ ЖИЗНЬ"
//           buttonLink="https://www.instagram.com/katringoncharuk/"
//         />
//       </div>
//       <div className="right-column">
//         <Section
//           title="Я Катя."
//           imgSrc={kateFoto}
//           content="Я помогу тебе получить временный либо постоянный вид на жительство (czasowy pobyt, stały pobyt). Я прослежу за твоим делом, помогу подготовить и донести недостающие документы в Ужонд, составлю тебе правильно письма для Ужонда, аппеляции или жалобы, а также многое другое."
//           buttonText="ХОЧУ КАРТУ ОТ 400 зл."
//         />
//         <Section
//           title="Получи персональный план по легализации в Польше."
//           content="Напиши нам в один из трех мессенджеров. Опиши свою ситуацию и укажи, какая помощь тебе нужна. Наши специалисты изучат твою ситуацию и отправят четкий план действий."
//           buttonText="ХОЧУ ПЛАН"
//         />
//       </div>
//     </div>
//   );
// };

// export default MainPageSections;


import React, { useState } from 'react';
import './MainPageSections.css';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import kateFoto from '../images/Kate_foto1.jpg'; // Импортируем фотографию
import { useTranslation } from 'react-i18next';

function openViberChat(e) {
    e.preventDefault();
    const viberUrl = "viber://chat?number=%2B375295817240";
    const fallbackUrl = "https://www.viber.com/download/";
  
    // Попытка открыть Viber
    window.location.href = viberUrl;
  
    // Если Viber не установлен, перенаправляем на fallback URL
    setTimeout(() => {
      if (!document.hasFocus()) {
        return;
      }
      window.location.href = fallbackUrl;
    }, 500);
}

const Modal = ({ show, onClose }) => {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{t('modal.title')}</h2>
        <p>{t('modal.call')} <a href="tel:+48777888999">+48 777 888 999</a></p>
        <div className="contact-icons">
          <a href="https://t.me/katringoncharuk" target="_blank" rel="noopener noreferrer">
            <img src={telegramIcon} alt="Telegram" className="contact-icon"/>
          </a>
          <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer">
            <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
          </a>
          <a href="#!" onClick={openViberChat}>
            <img src={viberIcon} alt="Viber" className="contact-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, content, imgSrc, buttonText, buttonLink }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="section">
      <h3>{title}</h3>
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
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

const MainPageSections = () => {
  const { t } = useTranslation();
  return (
    <div className="main-page-sections">
      <div className="left-column">
        <Section
          title={t('section1.title')}
          content={t('section1.content')}
          buttonText={t('section1.buttonText')}
        />
        <Section
          title={t('section2.title')}
          content={t('section2.content')}
          buttonText={t('section2.buttonText')}
        />
        <Section
          title={t('section3.title')}
          content={t('section3.content')}
          buttonText={t('section3.buttonText')}
          buttonLink="https://www.instagram.com/katringoncharuk/"
        />
      </div>
      <div className="right-column">
        <Section
          title={t('section4.title')}
          imgSrc={kateFoto}
          content={t('section4.content')}
          buttonText={t('section4.buttonText')}
        />
        <Section
          title={t('section5.title')}
          content={t('section5.content')}
          buttonText={t('section5.buttonText')}
        />
      </div>
    </div>
  );
};

export default MainPageSections;
