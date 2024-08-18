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
    <div className="pricelist" id = "promotions">
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
