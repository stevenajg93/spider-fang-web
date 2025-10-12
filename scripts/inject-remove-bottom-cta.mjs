import fs from 'fs';
const f = 'app/layout.tsx';
let s = fs.readFileSync(f, 'utf8');

// Ensure import exists
if (!s.includes('RemoveBottomCta')) {
  const add = 'import RemoveBottomCta from "@/components/util/RemoveBottomCta";\n';
  const imp = /^(?:import .*?;\s*)+/s;
  s = imp.test(s) ? s.replace(imp, m => m + add) : add + s;
}

// Ensure component is mounted in <body>
if (!s.includes('<RemoveBottomCta />')) {
  s = s.replace(/(<body[^>]*>)/, '$1\n    <RemoveBottomCta />');
}

fs.writeFileSync(f, s);
console.log('Injected RemoveBottomCta into app/layout.tsx');
