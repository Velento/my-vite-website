// src/Components/Main_page/MainPageSections.jsx

import React, { useState } from 'react';
import './MainPageSections.css';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import kateFoto from '../images/Kate_foto1.jpg'; // Импортируем фотографию

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
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Выберите удобный тип связи</h2>
        <p>Позвонить: <a href="tel:+48777888999">+48 777 888 999</a></p>
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

const Section = ({ title, content, imgSrc }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="section">
      <h3>{title}</h3>
       {imgSrc && <img src={imgSrc} alt="Section" className="kate_foto" />}
      <div className="section-content">
        <p>{content}</p>
      </div>
      <button onClick={handleShowModal}>ХОЧУ!</button>
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

const MainPageSections = () => {
  return (
    <div className="main-page-sections">
      <div className="left-column">
      <Section
          title="Доведем до результата или вернем деньги!"
          content="Мы работаем по договору с гарантией возврата денег. Это значит, что если что-то пойдет не по плану и если по нашей вине ты не получишь конечного результата, то мы вернем тебе всю сумму за наши услуги. "
        />
        <Section
          title="Свяжись сейчас и узнай как решить твой вопрос максимально быстро!"
          content="Свяжись с нами прямо сейчас! Смело задавай вопрос нашему специалисту. Мы ответим на него максимально быстро."
        />
        <Section
          title="Участвуй в розыгрыше пожизненной бесплатной юридической помощи. Розыгрыш каждый месяц"
          content="Мы хотим дать максимально пользы с нашей стороны. Мы часто консультируем людей бесплатно. Однако многие нуждаются в оказании коммплексной юридической помощи, на которую не всегда находятся финансы. Поэтому не упускай свой шанс! Ты можешь стать победителем розыгрыша в нашей группе Инстаграмм. Подписывайся и играй!"
        />
      </div>
      <div className="right-column">
        <Section
          title="Я Катя."
          imgSrc={kateFoto}
          content="Я помогу тебе получить временный либо постоянный вид на жительство. Я прослежу за твоим делом, помогу подготовить и донести недостающие документы в Ужонд, составлю тебе правильно письма для Ужонда и многое другое."
        />
         <Section
          title="Получи персональный план по легализации в Польше."
          content="Напиши нам в один из трех мессенджеров. Опиши свою ситуацию и укажи какая помощь тебе нужна. Наши специалисты изучат твою ситуацию и отправят четкий план действий."
        />
      </div>
    </div>
  );
};

export default MainPageSections;

