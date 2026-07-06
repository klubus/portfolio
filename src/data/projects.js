import elTigreThumb from '../assets/img/el-tigre-thumb.png';
import waiterAppThumb from '../assets/img/waiter-app-thumb.png';
import pizzeriaThumb from '../assets/img/project-pizzeria-thumb.png';

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
    embedUrl: process.env.PUBLIC_URL + '/projects/el-tigre/index.html',
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
    embedUrl: process.env.PUBLIC_URL + '/projects/waiter-app/index.html',
    category: 'fullstack',
    tech: ['React', 'Redux', 'json-server', 'CSS'],
  },
  {
    slug: 'project-pizzeria',
    title: 'Pizzeria',
    description: 'Online pizzeria with menu, cart and booking',
    longDescription:
      'TODO — replace with real description of the project, features, and what it demonstrates.',
    imgUrl: pizzeriaThumb,
    githubUrl: 'https://github.com/klubus/project-pizzeria',
    embedUrl: process.env.PUBLIC_URL + '/projects/project-pizzeria/index.html',
    category: 'fullstack',
    tech: ['HTML', 'Sass', 'JavaScript', 'ES Modules'],
  },
];
