import React, { useState } from "react";
import "./Pricelist.css";
import iconCheak from "../images/play_point.svg";
import iconPobit from "../images/icon_pricelist_pobit.svg";
import slipButton from "../images/slip_button.png";
import slipButtonReason1 from "../images/slip_button_reason1.png";
import slipButtonReason2 from "../images/slip_button_reason2.png";
import slipButtonReason3 from "../images/slip_button_reason3.png";
import arrow from "../images/arrow.png"; // Путь к вашему изображению стрелки

// Данные для прайс-листа
const services = [
  {
    title: "Комплексная помощь с документами для подачи на карту побыта",
    points: [
      "на основании работы",
      "на основании бизнеса",
      "на основании проживания с семьей",
      "на основании брака с гражданином Польши",
    ],
    price: "от 500 до 1500 зл.", 
  },
  {
    title: "Помощь с документами для подачи на гражданство",
    points: [],
    price: "от 750 до 1500 зл. (Цена до 30.09.2024)", 
  },
  {
    title:
      'Трудовые споры. Из "Umowy zlecenia" в "Umowy o pracę"',
    points: [
      'Добиваемся перехода из "Umowy zlecenia" в "Umowy o pracę"',
      "Подаем жалобы на работодателя",
      "Подаем иски в суд",
      "Требуем материальной компенсации за незаконное трудоустройство",
    ],
    price: "от 2500 до 3500 зл.", 
  },
  {
    title: "Подготовка документов для регистрации брака",
    points: [],
    price: "от 500 до 1500 зл.", 
  },
  {
    title: "Замена водительских прав",
    points: [],
    price: "от 500 до 1500 зл.", 
  },
  {
    title: "Консультация юриста",
    points: [
      "Продолжительность консультации до 60 минут",
      "Онлайн или по телефону",
    ],
    price: "от 200 зл.", 
  },
  {
    title: "Составление резюме (CV)",
    points: ["С сопроводительным письмом", "Без сопроводительного письма"],
    price: "от 150 до 250 зл.", 
  },
];

const Pricelist = () => {
  const [showReasonButtons, setShowReasonButtons] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState({
    reason1: false,
    reason2: false,
    reason3: false,
  });

  // Функция для переключения состояния отображения текста причин
  const toggleReasonText = (reason) => {
    setSelectedReasons((prev) => ({
      ...prev,
      [reason]: !prev[reason],
    }));
  };

  return (
    <div className="pricelist">
      <h1 className="pricelist-title"></h1>
      <div className="columns">
        <div className="right-column">
          {/* Правая колонка для дополнительной информации */}
          <button
            className="slip-button"
            onClick={() => setShowReasonButtons(!showReasonButtons)}
            aria-label="Slip Button"
          >
            <img src={slipButton} alt="Slip Button" />
          </button>
          {showReasonButtons && (
            <div className="reason-buttons">
              <button
                className="reason-button"
                onClick={() => toggleReasonText("reason1")}
                aria-label="Reason 1"
              >
                <img src={slipButtonReason1} alt="Reason 1" />
              </button>
              {selectedReasons.reason1 && (
                <div className="reason-text">
                  Здесь текст для slip_button_reason1.png
                </div>
              )}
              <img src={arrow} alt="Arrow" className="arrow arrow-1" />

              <button
                className="reason-button"
                onClick={() => toggleReasonText("reason2")}
                aria-label="Reason 2"
              >
                <img src={slipButtonReason2} alt="Reason 2" />
              </button>
              {selectedReasons.reason2 && (
                <div className="reason-text">
                  Здесь текст для slip_button_reason2.png
                </div>
              )}
              <img src={arrow} alt="Arrow" className="arrow arrow-2" />

              <button
                className="reason-button"
                onClick={() => toggleReasonText("reason3")}
                aria-label="Reason 3"
              >
                <img src={slipButtonReason3} alt="Reason 3" />
              </button>
              {selectedReasons.reason3 && (
                <div className="reason-text">
                  Здесь текст для slip_button_reason3.png
                </div>
              )}
              <img src={arrow} alt="Arrow" className="arrow arrow-3" />
            </div>
          )}
        </div>
        <div className="left-column">
          {services.map((service, index) => (
            <div className="service" key={index}>
              <div className="service-header">
                <img
                  src={iconPobit}
                  alt="Service Icon"
                  className="service-icon"
                />
                <h2 className="service-title">{service.title}</h2>
              </div>
              <ul className="service-points">
                {service.points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    <img
                      src={iconCheak}
                      alt="Point Icon"
                      className="point-icon"
                    />
                    <span className="point-text">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="buttons">
                <button className="price-button" disabled>
                  {service.price}
                </button>
                <button className="consult-button">
                  Получить консультацию
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricelist;










// import React from "react";
// import "./Pricelist.css";
// import iconCheak from "../images/play_point.svg"; 
// import iconPobit from "../images/icon_pricelist_pobit.svg";

// // Данные для прайс-листа
// const services = [
//   {
//     title: "Комплексная помощь с документами для подачи на карту побыта",
//     points: [
//       "на основании работы",
//       "на основании бизнеса",
//       "на основании проживания с семьей",
//       "на основании брака с гражданином Польши",
//     ],
//     price: "от 500 до 1500 зл.", // Добавление ценовой информации
//   },
//   {
//     title: "Помощь с документами для подачи на гражданство",
//     points: [
//     ],
//     price: "от 750 до 1500 зл. (Цена до 30.09.2024)", // Добавление ценовой информации
//   },
//   {
//     title: "Трудовые споры. Из \"Umowy zlecenia\" в \"Umowy o pracę\"",
//     points: [
//       "Добиваемся перехода из \"Umowy zlecenia\" в \"Umowy o pracę\"",
//       "Подаем жалобы на работодателя",
//       "Подаем иски в суд",
//       "Требуем материальной компенсации за незаконное трудоустройство"
//     ],
//     price: "от 2500 до 3500 зл.", // Добавление ценовой информации
//   },
//   {
//     title: "Подготовка документов для регистрации брака",
//     points: [
//     ],
//     price: "от 500 до 1500 зл.", // Добавление ценовой информации
//   },
//   {
//     title: "Замена водительских прав",
//     points: [
//     ],
//     price: "от 500 до 1500 зл.", // Добавление ценовой информации
//   },
//   {
//     title: "Консультация юриста",
//     points: [
//       "Продолжительность консультации до 60 минут",
//       "Онлайн или по телефону"
//     ],
//     price: "от 200 зл.", // Добавление ценовой информации
//   },
//   {
//     title: "Составление резюме (CV)",
//     points: [
//       "С сопроводительным письмом",
//       "Без сопроводительного письма"
//     ],
//     price: "от 150 до 250 зл.", // Добавление ценовой информации
//   },

// ];

// const Pricelist = () => {
//   return (
//     <div className="pricelist">
//       <h1 className="pricelist-title"></h1>
//       <div className="columns">
//         <div className="right-column">
//           {/* Правая колонка для дополнительной информации */}
//         </div>
//         <div className="left-column">
//           {services.map((service, index) => (
//             <div className="service" key={index}>
//               <div className="service-header">
//                 <img
//                   src={iconPobit}
//                   alt="Service Icon"
//                   className="service-icon"
//                 />
//                 <h2 className="service-title">{service.title}</h2>
//               </div>
//               <ul className="service-points">
//                 {service.points.map((point, pointIndex) => (
//                   <li key={pointIndex}>
//                     <img src={iconCheak} alt="Point Icon" className="point-icon" />
//                     <span className="point-text">{point}</span> 
//                   </li>
//                 ))}
//               </ul>
//               <div className="buttons">
//               <button className="price-button" disabled>{service.price}</button>
//                 <button className="consult-button">Получить консультацию</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricelist;
