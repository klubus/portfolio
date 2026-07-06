import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import { HashLink } from 'react-router-hash-link';
import { useLanguage } from '../../i18n/LanguageContext';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
      <Container>
        <div className="lang-switch">
          <button
            type="button"
            className={lang === 'pl' ? 'active' : ''}
            onClick={() => setLang('pl')}
          >
            PL
          </button>
          <span className="lang-switch-divider">/</span>
          <button
            type="button"
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={HashLink}
              to="/#home"
              className={
                activeLink === 'home' ? 'active navbar-link' : 'navbar-link'
              }
              onClick={() => onUpdateActiveLink('home')}
            >
              {t('nav.home')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#about"
              className={
                activeLink === 'about' ? 'active navbar-link' : 'navbar-link'
              }
              onClick={() => onUpdateActiveLink('about')}
            >
              {t('nav.about')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#skills"
              className={
                activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'
              }
              onClick={() => onUpdateActiveLink('skills')}
            >
              {t('nav.skills')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#projects"
              className={
                activeLink === 'projects'
                  ? 'active navbar-link'
                  : 'navbar-link'
              }
              onClick={() => onUpdateActiveLink('projects')}
            >
              {t('nav.projects')}
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/krystian-kluba/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon1} alt="" />
              </a>
              <a
                href="https://github.com/klubus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon2} alt="" />
              </a>
            </div>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
