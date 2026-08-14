#!/usr/bin/env node

/**
 * Headless debug script for chas-ege templates
 * 
 * This script uses puppeteer to open otladka.html in headless mode,
 * generates tasks from a template multiple times, and exports LaTeX code
 * for each generated task.
 * 
 * Prerequisites:
 * 1. Build the project: `grunt`
 * 2. Install puppeteer: `npm install puppeteer@^23.0.0` (compatible with Node.js 22.7.0)
 * 
 * Usage:
 *   node headless-debug.mjs --filepath <path-to-template> [--iterations <count>]
 * 
 * Example:
 *   node headless-debug.mjs --filepath ../zdn/matege2024p/10/1.js --iterations 5
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
let filepath = '';
let iterations = 1;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--filepath' && args[i + 1]) {
        filepath = args[i + 1];
        i++;
    } else if (args[i] === '--iterations' && args[i + 1]) {
        iterations = parseInt(args[i + 1], 10);
        i++;
    }
}

if (!filepath) {
    console.error('Usage: node headless-debug.mjs --filepath <path> [--iterations <count>]');
    process.exit(1);
}

// Build the file:// URL to otladka.html
const otladkaPath = path.resolve(projectRoot, 'build', 'sh', 'otladka.html');
const otladkaUrl = `file://${otladkaPath}`;

console.log(`Opening ${otladkaUrl}...`);

const browser = await puppeteer.launch({
    headless: 'new',
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--allow-file-access-from-files',
        '--disable-web-security'
    ]
});

const page = await browser.newPage();

// Intercept copyToClipboard before page loads
await page.evaluateOnNewDocument((fp) => {
    window.parsedJSON = {
        filepath: fp,
        autostartFile: false
    };
    
    window.__latexResults = [];
    const originalCopyToClipboard = window.copyToClipboard;
    window.copyToClipboard = function(text) {
        window.__latexResults.push(text);
        console.log('=== LaTeX CODE START ===');
        console.log(text);
        console.log('=== LaTeX CODE END ===');
        if (originalCopyToClipboard) {
            return originalCopyToClipboard.call(this, text);
        }
    };
}, filepath);

// Open otladka.html
try {
    await page.goto(otladkaUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('Page loaded successfully.');
} catch (error) {
    console.error('Failed to load page:', error.message);
    await browser.close();
    process.exit(1);
}

// Wait for the page to be ready
await new Promise(resolve => setTimeout(resolve, 2000));

// Execute iterations
for (let i = 0; i < iterations; i++) {
    console.log(`\n=== Iteration ${i + 1} of ${iterations} ===`);
    
    // Set filepath and create from file
    await page.evaluate((fp) => {
        document.getElementById('filepath').value = fp;
        createFromFile();
    }, filepath);
    
    // Wait for question to be generated
    try {
        await page.waitForFunction(
            () => {
                const question = document.getElementById('question');
                return question && 
                       question.innerHTML !== 'Задание составляется, подождите...' &&
                       question.innerHTML !== '';
            },
            { timeout: 15000 }
        );
    } catch (error) {
        console.log('Timeout waiting for question to be generated, continuing...');
    }
    
    // Wait a bit for MathJax to render
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Click the LaTeX export button
    await page.evaluate(() => {
        if (typeof startQuickExportToTex === 'function') {
            startQuickExportToTex();
        } else {
            console.error('startQuickExportToTex is not defined');
        }
    });
    
    // Wait for the copyToClipboard to be called
    await new Promise(resolve => setTimeout(resolve, 1000));
}

await browser.close();
console.log('\n=== DONE ===');
process.exit(0);
