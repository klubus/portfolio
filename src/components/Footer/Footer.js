import { Container, Row, Col } from 'react-bootstrap';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="text-center text-sm-start">
            <span className="footer-brand">Krystian Kluba</span>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/krystian-kluba/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/klubus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon2} alt="GitHub" />
              </a>
            </div>
            <p>{t('footer.copyright')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
