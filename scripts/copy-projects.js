const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PROJECTS_SRC = path.join(ROOT, 'projects');
const PROJECTS_DEST = path.join(ROOT, 'public', 'projects');

// Files/folders skipped when a project has no dist/ — these are source-only
// or tooling-only artifacts that have no business in the served output.
const SKIP_WITHOUT_DIST = new Set([
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
    const distDir = path.join(srcDir, 'dist');
    const destDir = path.join(PROJECTS_DEST, name);

    if (isEmptyDir(srcDir)) {
      console.warn(
        `[copy-projects] ${name}: folder is empty — did you forget ` +
          `\`git submodule update --init --recursive\`? Skipping.`,
      );
      continue;
    }

    if (
      fs.existsSync(distDir) &&
      fs.statSync(distDir).isDirectory() &&
      !isEmptyDir(distDir)
    ) {
      fs.cpSync(distDir, destDir, { recursive: true });
      console.log(`[copy-projects] ${name}: copied dist/`);
      continue;
    }

    fs.mkdirSync(destDir, { recursive: true });
    const items = fs
      .readdirSync(srcDir, { withFileTypes: true })
      .filter((item) => !SKIP_WITHOUT_DIST.has(item.name));

    for (const item of items) {
      fs.cpSync(
        path.join(srcDir, item.name),
        path.join(destDir, item.name),
        { recursive: true },
      );
    }
    console.log(`[copy-projects] ${name}: copied folder (no dist/)`);
  }

  console.log('[copy-projects] done');
}

main();
