import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const html = readFileSync('out/index.html', 'utf8');
const document = new JSDOM(html).window.document;
const sheet = id => document.querySelector(`section[data-sheet="${id}"]`);

assert.equal(document.querySelectorAll('h1').length, 1);
assert.match(document.querySelector('h1').textContent, /Prudhvi.*Charan/);
assert(!document.querySelector('meta[name="viewport"]').content.includes('maximum-scale'));
assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://prudhvicharan.com/');
assert.equal(document.querySelector('meta[property="og:image"]').content, 'https://prudhvicharan.com/social-preview.png');
assert.match(document.querySelector('script[type="application/ld+json"]').textContent, /"@type":"Person"/);
assert(existsSync('out/social-preview.png') && existsSync('out/assets/resume.pdf') && existsSync('out/work/portrait.jpg'));
assert.match(readFileSync('out/robots.txt', 'utf8'), /Sitemap: https:\/\/prudhvicharan.com\/sitemap.xml/);
assert.match(readFileSync('out/sitemap.xml', 'utf8'), /<loc>https:\/\/prudhvicharan.com<\/loc>/);

// One complete site: every sheet is server-rendered, in order, and nothing links back to an old page.
assert.deepEqual([...document.querySelectorAll('main section[data-sheet]')].map(n => n.dataset.sheet), ['cover', 'profile', 'work', 'experience', 'materials', 'contact']);
for (const link of document.querySelectorAll('a[href^="/"]')) assert.match(link.getAttribute('href'), /^\/(assets|work)\//, `Unexpected internal route: ${link.getAttribute('href')}`);
for (const link of document.querySelectorAll('a[href^="#"]')) assert(document.getElementById(link.hash.slice(1)), `Missing anchor: ${link.hash}`);
for (const link of document.querySelectorAll('a')) assert(link.textContent.trim() || link.getAttribute('aria-label'), 'Unnamed link');
for (const input of document.querySelectorAll('input, textarea')) assert(input.id && document.querySelector(`label[for="${input.id}"]`));
assert(document.querySelectorAll('a[href="/assets/resume.pdf"]').length >= 2, 'Résumé must be reachable from the nav and the cover');
assert(document.querySelector('a[href="https://github.com/Prudhvicharan"]'));
assert(document.querySelector('a[href="https://www.linkedin.com/in/prudhvi-charan"]'));

// Facts come through from lib/data.ts.
assert.match(sheet('experience').textContent, /July 2026 – Present/);
assert.match(sheet('experience').textContent, /March 2025 – June 2026/);
assert.match(sheet('work').textContent, /Career Axis/);
for (const name of ['LaunchMasters', 'GitFolio', 'Four Founders']) assert.match(sheet('work').textContent, new RegExp(name));
assert.equal(document.querySelectorAll('.entry').length, 4, 'All four projects are in the register');
assert.match(sheet('materials').textContent, /Databricks/);
console.log('Export checks passed: sheets in order, no links to old pages, résumé reachable, labelled fields, named links, structured data, SEO files.');
