import colorSharp from '../../assets/img/color-sharp.png';
import { useLanguage } from '../../i18n/LanguageContext';

export const About = () => {
  const { t } = useLanguage();
  const education = t('about.educationEntries');
  const experience = t('about.experienceEntries');

  const renderEntries = (entries) =>
    entries.map((entry, idx) => (
      <div className="about-entry" key={idx}>
        <div className="about-entry-head">
          <h4>{entry.title}</h4>
          <span className="about-entry-period">{entry.period}</span>
        </div>
        <p className="about-entry-org">{entry.org}</p>
        <p className="about-entry-desc">{entry.description}</p>
      </div>
    ));

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="about-bx">
              <h2>{t('about.heading')}</h2>
              <div className="row about-grid">
                <div className="col-md-6 about-col">
                  <h3>{t('about.education')}</h3>
                  {renderEntries(education)}
                </div>
                <div className="col-md-6 about-col">
                  <h3>{t('about.experience')}</h3>
                  {renderEntries(experience)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="" />
    </section>
  );
};
