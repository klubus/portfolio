import projImg1 from '../assets/img/project-img1.png';
import projImg2 from '../assets/img/project-img2.png';
import projImg3 from '../assets/img/project-img3.png';
import elTigreThumb from '../assets/img/el-tigre-thumb.png';
import waiterAppThumb from '../assets/img/waiter-app-thumb.png';

// =====================================================================
// Add your projects here. Each project needs a unique `slug` (used as
// the URL: /project/<slug>). `category` controls which tab the card
// shows up in: 'fullstack' or 'vibe'.
//
// `embedUrl` is optional. If set, the project page will load the live
// project in an iframe. Two options:
//
//   1) Hosted somewhere (Vercel/Netlify/etc):
//      embedUrl: 'https://my-restaurant-menu.vercel.app'
//
//   2) Static build in this repo:
//      - Put the built files into:  public/projects/<slug>/
//        (e.g. public/projects/restaurant-menu/index.html + assets)
//      - Reference it with:
//        embedUrl: '/projects/restaurant-menu/index.html'
//
//      For CRA builds, set "homepage": "." in the project's package.json
//      before running `npm run build`, so asset paths are relative.
//      For Vite, set `base: './'` in vite.config.
//
// If `embedUrl` is not provided, the project page just shows the static
// screenshot from `imgUrl`.
// =====================================================================
export const projects = [
  {
    slug: 'el-tigre',
    title: 'El Tigre',
    description: 'Coffee shop landing page',
    longDescription:
      'A landing page for a fictional Venezuelan coffee brand, with product listing, hero rotation, and contact section. Built with vanilla JavaScript, Sass and Handlebars templates, with product data served from a JSON file.',
    imgUrl: elTigreThumb,
    githubUrl: 'https://github.com/klubus/project-el-tigre',
    embedUrl: '/projects/el-tigre/index.html',
    category: 'fullstack',
    tech: ['HTML', 'Sass', 'JavaScript', 'Handlebars'],
  },
  {
    slug: 'waiter-app',
    title: 'Waiter App',
    description: 'Restaurant table management',
    longDescription:
      'TODO — replace with real description of the project, features, and what it demonstrates.',
    imgUrl: waiterAppThumb,
    githubUrl: 'https://github.com/klubus/waiter-app',
    embedUrl: '/projects/waiter-app/index.html',
    category: 'fullstack',
    tech: ['React', 'Redux', 'json-server', 'CSS'],
  },
  {
    slug: 'example-fullstack-1',
    title: 'Example Full Stack App',
    description: 'Design & Development',
    longDescription:
      'Detailed description of what this project does, the problem it solves, technical decisions made along the way, and what you learned. Replace this with real content.',
    imgUrl: projImg1,
    githubUrl: 'https://github.com/klubus/example-fullstack-1',
    // embedUrl: 'https://example-fullstack-1.vercel.app',
    // embedUrl: '/projects/example-fullstack-1/index.html',
    category: 'fullstack',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    slug: 'example-fullstack-2',
    title: 'Another Full Stack App',
    description: 'Design & Development',
    longDescription:
      'Replace this with real content. Talk about features, architecture, and the experience of building it.',
    imgUrl: projImg2,
    githubUrl: 'https://github.com/klubus/example-fullstack-2',
    category: 'fullstack',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
  },
  {
    slug: 'example-fullstack-3',
    title: 'Third Full Stack App',
    description: 'Design & Development',
    longDescription: 'Replace this with real content.',
    imgUrl: projImg3,
    githubUrl: 'https://github.com/klubus/example-fullstack-3',
    category: 'fullstack',
    tech: ['NestJS', 'React', 'MySQL'],
  },
  {
    slug: 'example-vibe-1',
    title: 'Vibe Coded App',
    description: 'AI-Assisted Project',
    longDescription:
      'A project built with the help of AI tools. Replace with real content explaining the workflow and the role AI played.',
    imgUrl: projImg1,
    githubUrl: 'https://github.com/klubus/example-vibe-1',
    category: 'vibe',
    tech: ['Cursor', 'React', 'Tailwind'],
  },
  {
    slug: 'example-vibe-2',
    title: 'Another Vibe Project',
    description: 'AI-Assisted Project',
    longDescription: 'Replace with real content.',
    imgUrl: projImg2,
    githubUrl: 'https://github.com/klubus/example-vibe-2',
    category: 'vibe',
    tech: ['Claude Code', 'Next.js', 'Supabase'],
  },
];
