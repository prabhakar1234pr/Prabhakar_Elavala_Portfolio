const fs = require('fs');
const path = require('path');

const docPath = path.join(__dirname, '..', 'Readme', 'END_TO_END_PROJECT_DOCUMENTATION.md');
const content = fs.readFileSync(docPath, 'utf-8');

// Escape for template literal: backticks, backslashes, and ${ expressions
const escaped = content
  .replace(/\\/g, '\\\\')  // Escape backslashes first
  .replace(/`/g, '\\`')     // Escape backticks
  .replace(/\${/g, '\\${'); // Escape template literal expressions

// Write to a file that can be included
const outputPath = path.join(__dirname, '..', 'src', 'data', 'gitguide-content-escaped.txt');
fs.writeFileSync(outputPath, escaped, 'utf-8');

console.log('Escaped content written to:', outputPath);
console.log('Content length:', escaped.length, 'characters');
