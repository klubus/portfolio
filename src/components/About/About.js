import colorSharp from '../../assets/img/color-sharp.png';

export const About = () => {
  const education = [
    {
      title: 'Bootcamp: Full Stack Developer',
      org: 'Kodilla',
      period: '06.2025 – 01.2026',
      description:
        'Comprehensive bootcamp covering HTML, CSS, Sass, JavaScript, React, Redux, TypeScript, Node.js, Express, NestJS, MongoDB and MySQL/Prisma.',
    },
    {
      title: 'B2 First — Cambridge FCE',
      org: 'University of Cambridge',
      period: '05.2025',
      description: 'B2 level English certificate.',
    },
    {
      title: 'ACP-620 — Managing Jira Projects for Cloud',
      org: 'Atlassian',
      period: '07.2024',
      description:
        'Atlassian certification for managing Jira projects in the Cloud.',
    },
    {
      title: 'IT Engineer',
      org: 'Wyższa Szkoła Ekonomii i Informatyki w Krakowie',
      period: '10.2019 – 03.2023',
      description: 'Engineering degree (inż.) in Information Technology.',
    },
  ];

  const experience = [
    {
      title: 'QA Regular Automation',
      org: 'Deviniti',
      period: '02.2023 – Present',
      description:
        'Functional and regression testing. Writing automated tests with Playwright using JavaScript and TypeScript.',
    },
    {
      title: 'Junior Test Engineer',
      org: 'Mc Comp',
      period: '07.2021 – 01.2023',
      description:
        'Creating and planning test scenarios. Working with Git, responsible for preparing and releasing versions.',
    },
  ];

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
              <h2>About Me</h2>
              <div className="row about-grid">
                <div className="col-md-6 about-col">
                  <h3>Education</h3>
                  {renderEntries(education)}
                </div>
                <div className="col-md-6 about-col">
                  <h3>Work Experience</h3>
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
