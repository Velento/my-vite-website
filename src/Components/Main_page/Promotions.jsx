import React from "react";
import "./Pricelist.css";
import "./Promotions.css";
import iconCheak from "../images/play_point.svg"; 
import iconPromo from "../images/icon_promo.svg";
import { useTranslation } from "react-i18next"; 

const Pricelist = () => {
  const { t } = useTranslation();

  const servicespromo = [
    {
      title: t("servicespromo.0.title"),
      points: [
        t("servicespromo.0.points.0"),
        t("servicespromo.0.points.1"),
        t("servicespromo.0.points.2"),
      ]
    }
  ];

  return (
    <div className="pricelist">
      <div className="columns">
        <div className="right-column">
        </div>
        <div className="left-column">
          {servicespromo.map((service, index) => (
            <div className="service" key={index}>
              <div className="service-header">
                <img
                  src={iconPromo}
                  alt="Promo Icon"
                  className="service-icon"
                />
                <h2 className="service-title">{service.title}</h2>
              </div>
              <ul className="service-points">
                {service.points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    <img src={iconCheak} alt="Point Icon" className="point-icon" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricelist;














// Translation data
// Translation data
// const translations = {
//     en: {
//       "pricelist": {
//         "services.0.title": "PROMOTIONS",
//         "services.0.points.0": "Residence card for 400 PLN. Get the 'Basic' package for 400 PLN. To take advantage of the promotion, tell our customer service specialist the promo code 'Start24'. The promotion is valid only until the end of September 2024.",
//         "services.0.points.1": "Residence card for 750 PLN. Get the 'All inclusive' package for 750 PLN. To take advantage of the promotion, tell our customer service specialist the promo code 'Start24'. The promotion is valid only until the end of September 2024.",
//         "services.0.points.2": "Citizenship documents for 1500 PLN. 'All inclusive' package. To take advantage of the promotion, tell our customer service specialist the promo code 'Start24'. The promotion is valid only until the end of September 2024."
//       }
//     },
//     ru: {
//       "pricelist": {
//         "services.0.title": "АКЦИИ",
//         "services.0.points.0": "Карта побыту за 400 зл. Успейте приобрести пакет \"Базовый\" за 400 зл. Чтобы воспользоваться акцией, назовите нашему специалисту по работе с клиентами промокод \"Старт24\". Акция действует только до конца сентября 2024 года.",
//         "services.0.points.1": "Карта побыту за 750 зл. Успейте приобрести пакет \"Все включено\" за 750 зл. Чтобы воспользоваться акцией, назовите нашему специалисту по работе с клиентами промокод \"Старт24\". Акция действует только до конца сентября 2024 года.",
//         "services.0.points.2": "Документы на гражданство за 1500 зл. Пакет \"Все включено\". Чтобы воспользоваться акцией, назовите нашему специалисту по работе с клиентами промокод \"Старт24\". Акция действует только до конца сентября 2024 года."
//       }
//     },
//     pl: {
//       "pricelist": {
//         "services.0.title": "PROMOCJE",
//         "services.0.points.0": "Karta pobytu za 400 zł. Uzyskaj pakiet \"Podstawowy\" za 400 zł. Aby skorzystać z promocji, podaj naszemu specjaliście ds. obsługi klienta kod promocyjny \"Start24\". Promocja obowiązuje tylko do końca września 2024 roku.",
//         "services.0.points.1": "Karta pobytu za 750 zł. Uzyskaj pakiet \"Wszystko w cenie\" za 750 zł. Aby skorzystać z promocji, podaj naszemu specjaliście ds. obsługi klienta kod promocyjny \"Start24\". Promocja obowiązuje tylko do końca września 2024 roku.",
//         "services.0.points.2": "Dokumenty obywatelstwa za 1500 zł. Pakiet \"Wszystko w cenie\". Aby skorzystać z promocji, podaj naszemu specjaliście ds. obsługi klienta kod promocyjny \"Start24\". Promocja obowiązuje tylko do końca września 2024 roku."
//       }
//     },
//     uk: {
//       "pricelist": {
//         "services.0.title": "АКЦІЇ",
//         "services.0.points.0": "Карта побиту за 400 зл. Встигніть придбати пакет \"Базовий\" за 400 зл. Щоб скористатися акцією, назвіть нашому спеціалісту по роботі з клієнтами промокод \"Старт24\". Акція діє тільки до кінця вересня 2024 року.",
//         "services.0.points.1": "Карта побиту за 750 зл. Встигніть придбати пакет \"Все включено\" за 750 зл. Щоб скористатися акцією, назвіть нашому спеціалісту по роботі з клієнтами промокод \"Старт24\". Акція діє тільки до кінця вересня 2024 року.",
//         "services.0.points.2": "Документи на громадянство за 1500 зл. Пакет \"Все включено\". Щоб скористатися акцією, назвіть нашому спеціалісту по роботі з клієнтами промокод \"Старт24\". Акція діє тільки до кінця вересня 2024 року."
//       }
//     },
//     be: {
//       "pricelist": {
//         "services.0.title": "АКЦЫІ",
//         "services.0.points.0": "Карта побыту за 400 зл. Паспейце набыць пакет \"Базавы\" за 400 зл. Каб скарыстацца акцыяй, назавіце нашаму спецыялісту па працы з кліентамі промакод \"Старт24\". Акцыя дзейнічае толькі да канца верасня 2024 года.",
//         "services.0.points.1": "Карта побыту за 750 зл. Паспейце набыць пакет \"Усё ўключана\" за 750 зл. Каб скарыстацца акцыяй, назавіце нашаму спецыялісту па працы з кліентамі промакод \"Старт24\". Акцыя дзейнічае толькі да канца верасня 2024 года.",
//         "services.0.points.2": "Дакументы на грамадзянства за 1500 зл. Пакет \"Усё ўключана\". Каб скарыстацца акцыяй, назавіце нашаму спецыялісту па працы з кліентамі промакод \"Старт24\". Акцыя дзейнічае толькі да канца верасня 2024 года."
//       }
//     }
//   };
