#!/usr/bin/env node

/**
 * Dimension Audit Script
 * 
 * Scans the codebase for non-standard dimension values and suggests replacements
 * based on the design system standards.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Standard dimension mappings
const DIMENSION_MAP = {
  // Heights
  'h-11': 'h-10 or h-12 (use buttonClasses.md or buttonClasses.lg)',
  'h-13': 'h-12 (use buttonClasses.lg)',
  'h-14': 'h-14 ✓ (already standard)',
  'min-h-[46px]': 'min-h-[48px] or use buttonClasses.lg',
  'min-h-[50px]': 'min-h-[48px] or use buttonClasses.lg',
  'min-h-[52px]': 'min-h-[48px] or use buttonClasses.lg',
  'min-h-[44px]': 'min-h-[40px] or use inputClasses.md',
  'min-h-[34px]': 'min-h-[32px] or use buttonClasses.sm',
  
  // Widths
  'w-11': 'w-10 or w-12 (use iconButtonClasses)',
  'w-13': 'w-12 (use iconButtonClasses.xl)',
  'w-9': 'w-9 ✓ (already standard)',
  
  // Padding
  'px-5': 'px-4 or px-6',
  'px-7': 'px-6 or px-8',
  'py-5': 'py-4 or py-6',
  'p-7': 'p-6 or p-8',
  
  // Border radius
  'rounded-[13px]': 'rounded-xl (16px)',
  'rounded-[15px]': 'rounded-xl (16px)',
  
  // Icon sizes
  'size={17}': 'size={16} or size={18} (use iconSize.md or iconSize.lg)',
  'size={19}': 'size={18} or size={20} (use iconSize.lg or iconSize.xl)',
  'size={15}': 'size={14} or size={16} (use iconSize.sm or iconSize.md)',
  'size={13}': 'size={12} or size={14} (use iconSize.xs or iconSize.sm)',
  
  // Gap
  'gap-5': 'gap-4 or gap-6',
  'gap-7': 'gap-6 or gap-8',
};

// Patterns to search for
const PATTERNS = [
  // Non-standard heights
  /h-(?:11|13|15|17|19|21|23|25|27|29|31)\b/g,
  /min-h-\[(?:34|38|42|44|46|50|52|54|58|62)px\]/g,
  
  // Non-standard widths
  /w-(?:11|13|15|17|19|21|23|25|27|29|31)\b/g,
  
  // Non-standard padding
  /p(?:x|y)?-(?:5|7|9|11|13|15)\b/g,
  
  // Non-standard border radius
  /rounded-\[(?:\d+)px\]/g,
  
  // Non-standard icon sizes
  /size=\{(?:13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47)\}/g,
  
  // Non-standard gaps
  /gap-(?:5|7|9|11|13|15)\b/g,
];

async function findFiles() {
  return await glob('teleproperty-web/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**']
  });
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  
  PATTERNS.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const suggestion = DIMENSION_MAP[match];
        if (suggestion) {
          issues.push({
            file: filePath,
            issue: match,
            suggestion: suggestion || 'Review against design system standards'
          });
        }
      });
    }
  });
  
  return issues;
}

async function main() {
  console.log('🔍 Auditing dimensions across the codebase...\n');
  
  const files = await findFiles();
  let totalIssues = 0;
  const issuesByFile = {};
  
  files.forEach(file => {
    const issues = analyzeFile(file);
    if (issues.length > 0) {
      issuesByFile[file] = issues;
      totalIssues += issues.length;
    }
  });
  
  // Print results
  if (totalIssues === 0) {
    console.log('✅ No dimension issues found! All components use standard dimensions.');
  } else {
    console.log(`Found ${totalIssues} non-standard dimension values in ${Object.keys(issuesByFile).length} files:\n`);
    
    Object.entries(issuesByFile).forEach(([file, issues]) => {
      console.log(`\n📄 ${file.replace('teleproperty-web/', '')}`);
      const uniqueIssues = [...new Set(issues.map(i => i.issue))];
      uniqueIssues.forEach(issue => {
        const suggestion = issues.find(i => i.issue === issue).suggestion;
        console.log(`   ${issue} → ${suggestion}`);
      });
    });
    
    console.log(`\n\n📊 Summary: ${totalIssues} issues in ${Object.keys(issuesByFile).length} files`);
    console.log('\n💡 Tip: Import from @/lib/design-system/dimensions and use:');
    console.log('   - buttonClasses for buttons');
    console.log('   - iconButtonClasses for icon buttons');
    console.log('   - inputClasses for inputs');
    console.log('   - cardClasses for cards');
    console.log('   - iconSize for icon sizes');
  }
}

main().catch(console.error);
