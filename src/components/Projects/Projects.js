import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../data/projects';
import colorSharp2 from '../../assets/img/color-sharp2.png';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
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
                  <h2>Projects</h2>
                  <p>
                    A collection of projects I have built — Full Stack
                    applications from my development journey, and AI-assisted
                    projects exploring modern vibe coding tools.
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Full Stack apps</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Vibe Coding apps</Nav.Link>
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
                            This portfolio itself is a vibe coding project — it
                            was built with{' '}
                            <a
                              href="https://claude.com/claude-code"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Claude Code
                            </a>
                            , Anthropic&apos;s AI coding agent, working side by
                            side with me in the terminal.
                          </p>
                          <p className="vibe-note-claude">
                            A word from Claude: &ldquo;Vibe coding isn&apos;t
                            about pressing a magic button — Krystian reviewed,
                            questioned and steered every step. The best code we
                            wrote here came from that back-and-forth. It takes
                            two to vibe.&rdquo;
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
