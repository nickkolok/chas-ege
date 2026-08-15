#!/usr/bin/env node

/**
 * Headless debug script for chas-ege templates
 * 
 * Opens dist/sh/otladka.html in Chrome,
 * generates tasks from a template multiple times, and exports LaTeX code.
 * 
 * Prerequisites:
 * 1. Build the project: `grunt`
 * 2. Install puppeteer: `npm install puppeteer@^23.0.0` (compatible with Node.js 22.7.0)
 * 
 * Usage:
 *   node headless-debug.mjs --filepath <path-to-template> [--iterations <count>] [--headless]
 * 
 * Example:
 *   node headless-debug.mjs --filepath ../zdn/matege2024p/10/1.js --iterations 5 --headless
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let projectRoot = process.cwd();
while (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
    const parent = path.dirname(projectRoot);
    if (parent === projectRoot) {
        // Fallback to script location if package.json not found
        projectRoot = path.resolve(__dirname, '..');
        break;
    }
    projectRoot = parent;
}

// Parse command line arguments
const args = process.argv.slice(2);
let filepath = '';
let iterations = 1;
let headless = false; // Default to visible mode
let browserPath = '';
let tempProfile = false;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--filepath' && args[i + 1]) {
        filepath = args[i + 1];
        i++;
    } else if (args[i] === '--iterations' && args[i + 1]) {
        iterations = parseInt(args[i + 1], 10);
        i++;
    } else if (args[i] === '--headless') {
        headless = true;
    } else if (args[i] === '--browser' && args[i + 1]) {
        browserPath = args[i + 1];
        i++;
    } else if (args[i] === '--temp-profile') {
        tempProfile = true;
    }
}



if (!filepath) {
    console.error('Usage: node headless-debug.mjs --filepath <path> [--iterations <count>] [--headless]');
    process.exit(1);
}

const absoluteFilepath = path.resolve(process.cwd(), filepath);
const filepathRelativeToRoot = path.relative(projectRoot, absoluteFilepath);
const filepathForBrowser = '../../' + filepathRelativeToRoot.split(path.sep).join('/');

const otladkaPath = path.join(projectRoot, 'dist', 'sh', 'otladka.html');
const fileUrl = 'file://' + otladkaPath;

console.log(`Mode: ${headless ? 'headless' : 'visible'}`);

(async () => {
    const launchOptions = {
        headless: headless ? 'new' : false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files']
    };

    let tempDir = null;

    if (browserPath) {
        launchOptions.executablePath = browserPath;
    }

    if (tempProfile) {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer_dev_profile-'));
        launchOptions.userDataDir = tempDir;
    }

    const browser = await puppeteer.launch(launchOptions);
    
    const page = await browser.newPage();
    
    // Intercept copyToClipboard before page loads
    await page.evaluateOnNewDocument((fp) => {
        window.parsedJSON = {
            filepath: fp,
            autostartFile: false
        };
        
        const originalCopyToClipboard = window.copyToClipboard;
        window.copyToClipboard = function(text) {
            console.log('=== LaTeX CODE START ===');
            console.log(text);
            console.log('=== LaTeX CODE END ===');
            if (originalCopyToClipboard) {
                return originalCopyToClipboard.call(this, text);
            }
        };
    }, filepathForBrowser);
    
    console.log(`Opening ${fileUrl}...`);
    
    try {
        await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        console.log('Page loaded successfully.');
    } catch (error) {
        console.error('Failed to load page:', error.message);
        await browser.close();
        process.exit(1);
    }
    
    // Wait for page to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    for (let i = 0; i < iterations; i++) {
        console.log(`\n=== Iteration ${i + 1} of ${iterations} ===`);
        
        // Set filepath and create from file
        await page.evaluate((fp) => {
            document.getElementById('filepath').value = fp;
            createFromFile();
        }, filepathForBrowser);
        
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
            console.log('Timeout waiting for question generation, continuing...');
        }
        
        // Wait for MathJax
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Click LaTeX export button
        await page.evaluate(() => {
            if (typeof startQuickExportToTex === 'function') {
                startQuickExportToTex();
            } else {
                console.error('startQuickExportToTex is not defined');
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    await browser.close();
    if (tempDir) {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
    console.log('\n=== DONE ===');
    process.exit(0);
})();
