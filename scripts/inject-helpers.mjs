import fs from "fs";

const file = "app/layout.tsx";
let src = fs.readFileSync(file, "utf8");

// Add imports once
if (!src.includes('QuickThemeToggle') || !src.includes('ReorderSections')) {
  const add = 'import ReorderSections from "@/components/util/ReorderSections";\nimport QuickThemeToggle from "@/components/util/QuickThemeToggle";\n';
  const importBlock = /^(?:import .*?;\s*)+/s;
  if (importBlock.test(src)) {
    src = src.replace(importBlock, (m) => m + add);
  } else {
    src = add + src;
  }
}

// Mount components at start of <body>
if (!src.includes("<ReorderSections />")) {
  src = src.replace(/(<body[^>]*>)/, `$1
    <QuickThemeToggle />
    <ReorderSections />`);
}

fs.writeFileSync(file, src);
console.log("✓ Injected helpers into app/layout.tsx");
