import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../data/projects';
import colorSharp2 from '../../assets/img/color-sharp2.png';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useLanguage } from '../../i18n/LanguageContext';

export const Projects = () => {
  const { t } = useLanguage();
  const fullStackProjects = projects.filter((p) => p.category === 'fullstack');
  const vibeProjects = projects.filter((p) => p.category === 'vibe');

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? 'animate__animated animate__fadeIn' : ''
                  }
                >
                  <h2>{t('projects.heading')}</h2>
                  <p>{t('projects.intro')}</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          {t('projects.tabFullstack')}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          {t('projects.tabVibe')}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? 'animate__animated animate__slideInUp' : ''
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {fullStackProjects.map((project) => (
                            <ProjectCard key={project.slug} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {vibeProjects.map((project) => (
                            <ProjectCard key={project.slug} {...project} />
                          ))}
                        </Row>
                        <div className="vibe-note">
                          <p>
                            {t('projects.vibeNote1a')}
                            <a
                              href="https://claude.com/claude-code"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Claude Code
                            </a>
                            {t('projects.vibeNote1b')}
                          </p>
                          <p className="vibe-note-claude">
                            {t('projects.vibeNoteClaude')}
                          </p>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  );
};
