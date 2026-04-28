import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Team.css';
import team_member1 from '../images/rabotnik_1.webp';
import team_member2 from '../images/rabotnik_2.webp';
import team_member3 from '../images/rabotnik_3.webp';
import team_member4 from '../images/rabotnik_4.webp';
import team_member5 from '../images/rabotnik_5.webp';
import { useTranslation } from 'react-i18next';

const TEAM_MEMBERS = [team_member3, team_member5, team_member4, team_member1, team_member2];

const Team = () => {
  const { t } = useTranslation();

  return (
    <section className="team-section">
      <h2 className="team-title" id="about">
        {t('team.title')}
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={4}
        spaceBetween={16}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={500}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        a11y={{ enabled: true }}
      >
        {TEAM_MEMBERS.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="team-slide">
              <img className="team-slide__img" src={src} alt={t('team.memberAlt')} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="team-mission">
        <p>{t('team.mission.content')}</p>
      </div>
    </section>
  );
};

export default Team;
