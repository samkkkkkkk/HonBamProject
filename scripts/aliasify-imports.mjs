// scripts/aliasify-imports.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

const dryRun = process.argv.includes('--dry');
const verbose = process.argv.includes('--verbose');

const SRC_EXTS = new Set(['.js', '.jsx', '.ts', '.tsx']);

const importPatterns = [
  { re: /(from\s+['"])([^'"]+)(['"])/g, specIdx: 2, leftIdx: 1, rightIdx: 3 },
  {
    re: /(^|\s)(import\s+['"])([^'"]+)(['"])/gm,
    specIdx: 3,
    leftIdx: 2,
    rightIdx: 4,
  },
  {
    re: /(export\s+.*\s+from\s+['"])([^'"]+)(['"])/g,
    specIdx: 2,
    leftIdx: 1,
    rightIdx: 3,
  },
  {
    re: /(require\(\s*['"])([^'"]+)(['"]\s*\))/g,
    specIdx: 2,
    leftIdx: 1,
    rightIdx: 3,
  },
  {
    re: /(import\(\s*['"])([^'"]+)(['"]\s*\))/g,
    specIdx: 2,
    leftIdx: 1,
    rightIdx: 3,
  },
];

const walk = (dir) => {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
};

const toPosix = (p) => p.split(path.sep).join('/');

const files = walk(srcDir).filter((f) => SRC_EXTS.has(path.extname(f)));
let changedCount = 0;

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  for (const { re, specIdx, leftIdx, rightIdx } of importPatterns) {
    code = code.replace(re, (match, ...groups) => {
      const spec = groups[specIdx - 1];
      const left = groups[leftIdx - 1];
      const right = groups[rightIdx - 1];

      // 상대경로만 변환
      if (!spec.startsWith('.')) {
        return match;
      }

      const abs = path.resolve(path.dirname(file), spec);
      const inSrc = abs === srcDir || abs.startsWith(srcDir + path.sep);
      if (!inSrc) {
        return match;
      }

      const relToSrc = path.relative(srcDir, abs);
      const aliasSpec = '@/' + toPosix(relToSrc);

      if (verbose) {
        const rel = path.relative(projectRoot, file);
        console.log(`- ${rel}: "${spec}" -> "${aliasSpec}"`);
      }
      fileChanged = true;
      return `${left}${aliasSpec}${right}`;
    });
  }

  if (fileChanged) {
    changedCount++;
    if (dryRun) {
      console.log(`[DRY] ${path.relative(projectRoot, file)}`);
    } else {
      fs.writeFileSync(file, code, 'utf8');
      if (verbose) {
        console.log(`[OK] ${path.relative(projectRoot, file)}`);
      }
    }
  }
}

console.log(
  dryRun
    ? `[DONE][DRY] ${changedCount} file(s) would change.`
    : `[DONE] ${changedCount} file(s) updated.`
);
