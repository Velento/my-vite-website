import { useRef } from 'react';
import './Team.css';
import team_member1 from '../images/rabotnik_1.webp';
import team_member2 from '../images/rabotnik_2.webp';
import team_member3 from '../images/rabotnik_3.webp';
import team_member4 from '../images/rabotnik_4.webp';
import team_member5 from '../images/rabotnik_5.webp';
import { useTranslation } from 'react-i18next';

const TEAM_MEMBERS = [team_member3, team_member5, team_member4, team_member1, team_member2];

/**
 * Team gallery — native CSS scroll-snap carousel. Replaces Swiper: the browser
 * handles momentum scroll + snapping, the arrow buttons just nudge by one card.
 */
const Team = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <section className="team-section">
      <h2 className="team-title" id="about">
        {t('team.title')}
      </h2>
      <div className="team-carousel">
        <button
          type="button"
          className="team-nav team-nav--prev"
          onClick={() => scrollByCard(-1)}
          aria-label={t('team.prev', 'Poprzedni')}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <ul className="team-track" ref={trackRef}>
          {TEAM_MEMBERS.map((src, i) => (
            <li key={i} className="team-slide">
              <img
                className="team-slide__img"
                src={src}
                alt={t('team.memberAlt', { index: i + 1 })}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="team-nav team-nav--next"
          onClick={() => scrollByCard(1)}
          aria-label={t('team.next', 'Następny')}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="team-mission">
        <p>{t('team.mission.content')}</p>
      </div>
    </section>
  );
};

export default Team;
