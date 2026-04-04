import Slider from 'react-slick'; // Используем библиотеку react-slick для слайдера
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Team.css';
import team_member1 from '../images/rabotnik_1.jpg';
import team_member2 from '../images/rabotnik_2.jpg';
import team_member3 from '../images/rabotnik_3.jpg';
import team_member4 from '../images/rabotnik_4.jpg';
import team_member5 from '../images/rabotnik_5.jpg';
import { useTranslation } from 'react-i18next';

const TEAM_SLIDER_SETTINGS = {
  lazyLoad: 'ondemand',
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  centerMode: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const TEAM_MEMBERS = [team_member3, team_member5, team_member4, team_member1, team_member2];

const Team = () => {
  const { t } = useTranslation();

  return (
    <section className="team-section">
      <h2 className="team-title" id="about">
        {t('team.title')}
      </h2>
      <Slider {...TEAM_SLIDER_SETTINGS}>
        {TEAM_MEMBERS.map((src, i) => (
          <div className="team-slide" key={i}>
            <img className="team-slide__img" src={src} alt={t('team.memberAlt')} />
          </div>
        ))}
      </Slider>
      <div className="team-mission">
        <p>{t('team.mission.content')}</p>
      </div>
    </section>
  );
};

export default Team;
