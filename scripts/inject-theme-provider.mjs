import fs from 'fs';

const file = 'app/layout.tsx';
let src = fs.readFileSync(file, 'utf8');

// 1) Add import if missing
if (!src.includes("ThemeProvider from \"next-themes\"") && !src.includes("ThemeProvider from 'next-themes'")) {
  const add = "import { ThemeProvider } from 'next-themes';\n";
  const imp = /^(?:import .*?;\s*)+/s;
  src = imp.test(src) ? src.replace(imp, m => m + add) : add + src;
}

// 2) Wrap the body content with <ThemeProvider attribute="class">
if (!src.includes("<ThemeProvider")) {
  // Insert immediately inside <body> and close before </body>
  src = src.replace(/<body([^>]*)>/, '<body$1>\n      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n');
  src = src.replace(/<\/body>/, '      </ThemeProvider>\n    </body>');
}

fs.writeFileSync(file, src);
console.log('✓ ThemeProvider ensured in app/layout.tsx');
