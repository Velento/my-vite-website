import { useTranslation } from 'react-i18next';

const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section
      className="bg-[var(--color-primary)] py-[var(--space-lg)] px-[var(--content-padding)]"
      aria-label="Trust indicators"
    >
      <div className="mx-auto flex max-w-[var(--max-width)] justify-center gap-12 sm:gap-8">
        <TrustItem number="500+" label={t('trustBar.clients')} />
        <TrustItem number="5+" label={t('trustBar.experience')} />
        <TrustItem number="5" label={t('trustBar.languages')} />
      </div>
    </section>
  );
};

type TrustItemProps = { number: string; label: string };

const TrustItem = ({ number, label }: TrustItemProps) => (
  <div className="flex flex-col items-center text-center">
    <strong className="font-[var(--font-heading)] text-2xl font-bold leading-none text-[var(--color-accent)] sm:text-xl">
      {number}
    </strong>
    <span className="mt-1 text-xs font-medium tracking-wide text-white/70">{label}</span>
  </div>
);

export default TrustBar;
