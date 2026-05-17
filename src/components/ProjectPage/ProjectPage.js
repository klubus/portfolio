import { useParams, Navigate } from 'react-router-dom';
import { projects } from '../../data/projects';

export const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  if (project.embedUrl) {
    return (
      <iframe
        src={project.embedUrl}
        title={project.title}
        className="project-page-fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    );
  }

  return (
    <section className="project-page">
      <div className="container">
        <div className="project-page-bx">
          <img
            src={project.imgUrl}
            alt={project.title}
            className="project-page-image"
          />
          <h1>{project.title}</h1>
          <p className="project-page-tagline">{project.description}</p>
          {project.tech && project.tech.length > 0 && (
            <div className="project-page-tech">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
          <p className="project-page-desc">{project.longDescription}</p>
        </div>
      </div>
    </section>
  );
};
