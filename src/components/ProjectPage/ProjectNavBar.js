import { Link, useParams } from 'react-router-dom';
import { projects } from '../../data/projects';
import navIcon2 from '../../assets/img/nav-icon2.svg';

export const ProjectNavBar = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  return (
    <nav className="project-navbar">
      <div className="container project-navbar-inner">
        <Link to="/#projects" className="project-navbar-link">
          <span className="project-navbar-arrow">←</span>
          <span>Go back to portfolio</span>
        </Link>
        {project?.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-navbar-link"
          >
            <img src={navIcon2} alt="" className="project-navbar-icon" />
            <span>Check GitHub repo</span>
          </a>
        )}
      </div>
    </nav>
  );
};
