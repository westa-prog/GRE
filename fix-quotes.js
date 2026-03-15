const fs = require('fs');
let c = fs.readFileSync('src/lib/mockQuestions.ts', 'utf8');

// Replace curly/smart single quotes with escaped straight apostrophe
c = c.replace(/\u2019/g, "\\'");
c = c.replace(/\u2018/g, "\\'");

// Replace curly/smart double quotes with straight double quotes
c = c.replace(/\u201C/g, '"');
c = c.replace(/\u201D/g, '"');

// Clean up any double-commas left by previous patch attempts
c = c.replace(/,\s*,/g, ',');

fs.writeFileSync('src/lib/mockQuestions.ts', c);
console.log('Done! File size:', c.length, 'bytes');
