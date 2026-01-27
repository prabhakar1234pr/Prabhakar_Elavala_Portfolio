const fs = require('fs');
const path = require('path');

const docPath = path.join(__dirname, '..', 'Readme', 'END_TO_END_PROJECT_DOCUMENTATION.md');
const content = fs.readFileSync(docPath, 'utf-8');

// Escape backticks and dollar signs for template literal
const escaped = content
  .replace(/\\/g, '\\\\')  // Escape backslashes first
  .replace(/`/g, '\\`')     // Escape backticks
  .replace(/\${/g, '\\${'); // Escape template literal expressions

console.log(escaped);
