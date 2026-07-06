import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProjectCard = ({ slug, title, description, imgUrl, tech }) => {
  const { lang } = useLanguage();
  return (
    <Col size={12} sm={6} md={4}>
      <Link to={`/project/${slug}`} className="proj-link">
        <div className="proj-imgbx">
          <img src={imgUrl} alt={title} />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description[lang] || description.en}</span>
            {tech && tech.length > 0 && (
              <div className="proj-tech">
                {tech.map((t) => (
                  <span key={t} className="proj-tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Col>
  );
};
