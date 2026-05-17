const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PROJECTS_SRC = path.join(ROOT, 'projects');
const PROJECTS_DEST = path.join(ROOT, 'public', 'projects');

// The base href injected into each project's index.html must match the
// URL the portfolio is actually served from. CRA dev server serves at /
// regardless of homepage, while the build emits assets at the homepage
// prefix. We pick the prefix based on which npm script triggered us:
// prestart = dev (no prefix), prebuild = production build (homepage prefix).
const PKG = require(path.join(ROOT, 'package.json'));
const IS_BUILD = process.env.npm_lifecycle_event === 'prebuild';
const PUBLIC_PREFIX = IS_BUILD ? (PKG.homepage || '').replace(/\/$/, '') : '';

// Build-output folders we look for, in priority order.
const OUTPUT_CANDIDATES = ['dist', 'build'];

// Files/folders skipped when a project has no recognized output folder —
// these are source-only or tooling-only artifacts that have no business
// in the served output.
const SKIP_WITHOUT_OUTPUT = new Set([
  '.git',
  '.gitignore',
  '.gitmodules',
  '.eslintrc.json',
  '.stylelintrc.json',
  'node_modules',
  'src',
  'package.json',
  'package-lock.json',
  'yarn.lock',
  'README.md',
  'server.mjs',
]);

function isEmptyDir(dir) {
  return fs.readdirSync(dir).length === 0;
}

// Patch the project's index.html so it behaves inside the portfolio iframe:
//   1. <base href="/projects/<slug>/"> keeps relative URLs (./static/...,
//      ./db/app.json, ...) resolving to the project's folder no matter
//      what we do to the history state.
//   2. The inline script rewrites the iframe's pathname to '/' before the
//      SPA bundle runs, so client-side routers (BrowserRouter, etc.) match
//      their own routes on first load instead of falling through to a
//      catch-all 404.
//   3. The click handler turns absolute-path anchor clicks (<a href="/">,
//      including react-bootstrap's Navbar.Brand) into in-iframe SPA
//      navigation via history.pushState + popstate — without that, the
//      browser would do a full navigation to portfolio's root.
function patchIndexForIframe(destDir, slug) {
  const indexPath = path.join(destDir, 'index.html');
  if (!fs.existsSync(indexPath)) return;

  const html = fs.readFileSync(indexPath, 'utf8');
  if (html.includes('data-portfolio-embed')) return;

  const basePath = `${PUBLIC_PREFIX}/projects/${slug}/`;
  const injection =
    `<base href="${basePath}">` +
    `<script data-portfolio-embed="${slug}">` +
    `(function(){` +
    `var base=${JSON.stringify(basePath)};` +
    `var p=window.location.pathname;` +
    `if(p.indexOf(base)===0){` +
    `var inside=p.slice(base.length-1);` +
    `if(inside==='/index.html'||inside==='')inside='/';` +
    `history.replaceState(null,'',inside+window.location.search+window.location.hash);` +
    `}` +
    `document.addEventListener('click',function(e){` +
    `if(e.defaultPrevented||e.button!==0)return;` +
    `if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;` +
    `var a=e.target&&e.target.closest&&e.target.closest('a');` +
    `if(!a)return;` +
    `var href=a.getAttribute('href');` +
    `if(!href||href.charAt(0)!=='/'||href.charAt(1)==='/')return;` +
    `if(a.target&&a.target!=='_self')return;` +
    `e.preventDefault();` +
    `history.pushState(null,'',href);` +
    `window.dispatchEvent(new PopStateEvent('popstate'));` +
    `});` +
    `})();` +
    `</script>`;

  const patched = html.replace(/<head[^>]*>/i, (m) => m + injection);
  if (patched === html) return;
  fs.writeFileSync(indexPath, patched);
  console.log(`[copy-projects] ${slug}: patched index.html for iframe routing`);
}

function main() {
  if (!fs.existsSync(PROJECTS_SRC)) {
    console.log('[copy-projects] no projects/ folder — nothing to stage');
    return;
  }

  fs.rmSync(PROJECTS_DEST, { recursive: true, force: true });
  fs.mkdirSync(PROJECTS_DEST, { recursive: true });

  const entries = fs
    .readdirSync(PROJECTS_SRC, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  if (entries.length === 0) {
    console.log('[copy-projects] projects/ is empty — nothing to stage');
    return;
  }

  for (const entry of entries) {
    const name = entry.name;
    const srcDir = path.join(PROJECTS_SRC, name);
    const destDir = path.join(PROJECTS_DEST, name);

    if (isEmptyDir(srcDir)) {
      console.warn(
        `[copy-projects] ${name}: folder is empty — did you forget ` +
          `\`git submodule update --init --recursive\`? Skipping.`,
      );
      continue;
    }

    const outputName = OUTPUT_CANDIDATES.find((candidate) => {
      const dir = path.join(srcDir, candidate);
      return (
        fs.existsSync(dir) &&
        fs.statSync(dir).isDirectory() &&
        !isEmptyDir(dir)
      );
    });

    if (outputName) {
      fs.cpSync(path.join(srcDir, outputName), destDir, { recursive: true });
      console.log(`[copy-projects] ${name}: copied ${outputName}/`);
      patchIndexForIframe(destDir, name);
      continue;
    }

    fs.mkdirSync(destDir, { recursive: true });
    const items = fs
      .readdirSync(srcDir, { withFileTypes: true })
      .filter((item) => !SKIP_WITHOUT_OUTPUT.has(item.name));

    for (const item of items) {
      fs.cpSync(
        path.join(srcDir, item.name),
        path.join(destDir, item.name),
        { recursive: true },
      );
    }
    console.log(`[copy-projects] ${name}: copied folder (no dist/ or build/)`);
    patchIndexForIframe(destDir, name);
  }

  console.log('[copy-projects] done');
}

main();
