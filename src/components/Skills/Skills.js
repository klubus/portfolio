import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from '../../assets/img/color-sharp.png';

const SkillCircle = ({ percent, id }) => {
  const size = 204;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const gradId = `skill-grad-${id}`;

  return (
    <svg
      className="skill-circle"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#AA367C" />
          <stop offset="100%" stopColor="#4A2FBD" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize="36"
        fontWeight="700"
        fontFamily="Centra, sans-serif"
      >
        {percent}%
      </text>
    </svg>
  );
};

const skills = [
  { name: 'HTML / CSS / Sass', percent: 90 },
  { name: 'JavaScript', percent: 90 },
  { name: 'React', percent: 85 },
  { name: 'Redux', percent: 80 },
  { name: 'TypeScript', percent: 80 },
  { name: 'Bootstrap', percent: 85 },
  { name: 'Node.js', percent: 85 },
  { name: 'Express', percent: 80 },
  { name: 'NestJS', percent: 75 },
  { name: 'MongoDB', percent: 75 },
  { name: 'MySQL / Prisma', percent: 75 },
  { name: 'Unit Testing', percent: 75 },
];

const aiSkills = [
  { name: 'Claude Code', percent: 90 },
  { name: 'Cursor', percent: 85 },
  { name: 'GitHub Copilot', percent: 85 },
  { name: 'Prompt Engineering', percent: 85 },
  { name: 'Context Management', percent: 80 },
  { name: 'AI Code Review', percent: 75 },
];

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <div className="skills-details">
                <h3>Full Stack</h3>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme skill-slider"
                >
                  {skills.map((skill, idx) => (
                    <div className="item" key={`a-${idx}`}>
                      <SkillCircle percent={skill.percent} id={`a-${idx}`} />
                      <h5>{skill.name}</h5>
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="skills-details">
                <h3>Vibe Coding</h3>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme skill-slider"
                >
                  {aiSkills.map((skill, idx) => (
                    <div className="item" key={`b-${idx}`}>
                      <SkillCircle percent={skill.percent} id={`b-${idx}`} />
                      <h5>{skill.name}</h5>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image1" />
    </section>
  );
};
