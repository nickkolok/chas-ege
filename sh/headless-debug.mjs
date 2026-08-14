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
 *   node headless-debug.mjs --filepath <path-to-template> [--iterations <count>] [--port <port>]
 * 
 * Example:
 *   node headless-debug.mjs --filepath ../zdn/matege2024p/10/1.js --iterations 5
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
let filepath = '';
let iterations = 1;
let port = 8000;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--filepath' && args[i + 1]) {
        filepath = args[i + 1];
        i++;
    } else if (args[i] === '--iterations' && args[i + 1]) {
        iterations = parseInt(args[i + 1], 10);
        i++;
    } else if (args[i] === '--port' && args[i + 1]) {
        port = parseInt(args[i + 1], 10);
        i++;
    }
}

if (!filepath) {
    console.error('Usage: node headless-debug.mjs --filepath <path> [--iterations <count>] [--port <port>]');
    process.exit(1);
}

// Check if build/sh/otladka.html exists
const buildOtladkaPath = path.join(projectRoot, 'build', 'sh', 'otladka.html');
if (!fs.existsSync(buildOtladkaPath)) {
    console.error(`Error: ${buildOtladkaPath} does not exist.`);
    console.error('Please run `grunt` first to build the project.');
    process.exit(1);
}

// Start HTTP server
const server = http.createServer((req, res) => {
    let filePath = path.join(projectRoot, req.url === '/' ? 'index.html' : req.url);
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
        case '.mjs':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.woff':
        case '.woff2':
            contentType = 'font/woff2';
            break;
        case '.ttf':
            contentType = 'font/ttf';
            break;
    }
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found: ' + filePath);
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, async () => {
    console.log(`HTTP server started at http://localhost:${port}/`);
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    
    // Listen to console messages
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('=== LaTeX CODE START ===')) {
            console.log(text);
        } else if (!text.includes('Не удалось выполнить автозапуск')) {
            console.log(`[BROWSER] ${text}`);
        }
    });
    
    // Intercept copyToClipboard before page loads
    await page.evaluateOnNewDocument((fp) => {
        window.parsedJSON = {
            filepath: fp,
            autostartFile: false // We'll control iterations manually
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
    const url = `http://localhost:${port}/build/sh/otladka.html`;
    console.log(`Opening ${url}...`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        console.log('Page loaded successfully.');
    } catch (error) {
        console.error('Failed to load page:', error.message);
        await browser.close();
        server.close();
        process.exit(1);
    }
    
    // Wait for the page to be ready (startShell to complete)
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
    server.close();
    console.log('\n=== DONE ===');
    process.exit(0);
});
