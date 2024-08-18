import React, { useState } from "react";
import { useTranslation } from "react-i18next"; 
import "./Pricelist.css";
import iconCheak from "../images/play_point.svg";
import iconPobit from "../images/icon_pricelist_pobit.svg";
import slipButton from "../images/slip_button.png";
import slipButtonReason1 from "../images/slip_button_reason1.png";
import slipButtonReason2 from "../images/slip_button_reason2.png";
import slipButtonReason3 from "../images/slip_button_reason3.png";
import ContactModal from "../Main_page/ContactModal"; 

const Pricelist = () => {
  const { t } = useTranslation(); 
  const [showReasonButtons, setShowReasonButtons] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState({
    reason1: false,
    reason2: false,
    reason3: false,
  });
  const [showContactModal, setShowContactModal] = useState(false);

  // Данные для прайс-листа
  const services = [
    {
      title: t("pricelistservices.0.title"),
      points: [
        t("pricelistservices.0.points.0"),
        t("pricelistservices.0.points.1"),
        t("pricelistservices.0.points.2"),
        t("pricelistservices.0.points.3"),
      ],
      price: t("pricelistservices.0.price"),
    },
    {
      title: t("pricelistservices.1.title"),
      points: [],
      price: t("pricelistservices.1.price"),
    },
    {
      title: t("pricelistservices.2.title"),
      points: [
        t("pricelistservices.2.points.0"),
        t("pricelistservices.2.points.1"),
        t("pricelistservices.2.points.2"),
        t("pricelistservices.2.points.3"),
      ],
      price: t("pricelistservices.2.price"),
    },
    {
      title: t("pricelistservices.3.title"),
      points: [],
      price: t("pricelistservices.3.price"),
    },
    {
      title: t("pricelistservices.4.title"),
      points: [],
      price: t("pricelistservices.4.price"),
    },
    {
      title: t("pricelistservices.5.title"),
      points: [
        t("pricelistservices.5.points.0"),
        t("pricelistservices.5.points.1"),
      ],
      price: t("pricelistservices.5.price"),
    },
    {
      title: t("pricelistservices.6.title"),
      points: [
        t("pricelistservices.6.points.0"),
        t("pricelistservices.6.points.1"),
      ],
      price: t("pricelistservices.6.price"),
    },
  ];

  // Функция для переключения состояния отображения текста причин
  const toggleReasonText = (reason) => {
    setSelectedReasons((prev) => ({
      ...prev,
      [reason]: !prev[reason],
    }));
  };

  // Функции для управления модальным окном
  const handleShowModal = () => setShowContactModal(true);
  const handleCloseModal = () => setShowContactModal(false);

  return (
    <div className="pricelist" id="pricelist">
      <h1 className="pricelist-title"></h1>
      <div className="columns">
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
                <button className="consult-button" onClick={handleShowModal}>
                  {t("consult_button")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="right-column">
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
                className="reason-button1"
                onClick={() => toggleReasonText("reason1")}
                aria-label="Reason 1"
              >
                <img
                  className="reason-button1"
                  src={slipButtonReason1}
                  alt="Reason 1"
                />
              </button>
              {selectedReasons.reason1 && (
                <div className="reason-text1">
                  {t("reason_texts.reason1")}
                </div>
              )}

              <button
                className="reason-button2"
                onClick={() => toggleReasonText("reason2")}
                aria-label="Reason 2"
              >
                <img
                  className="reason-button1"
                  src={slipButtonReason2}
                  alt="Reason 2"
                />
              </button>
              {selectedReasons.reason2 && (
                <div className="reason-text2">
                  {t("reason_texts.reason2")}
                </div>
              )}

              <button
                className="reason-button3"
                onClick={() => toggleReasonText("reason3")}
                aria-label="Reason 3"
              >
                <img
                  className="reason-button1"
                  src={slipButtonReason3}
                  alt="Reason 3"
                />
              </button>
              {selectedReasons.reason3 && (
                <div className="reason-text3">
                  {t("reason_texts.reason3")}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ContactModal show={showContactModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Pricelist;
