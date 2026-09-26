import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const html = readFileSync('out/index.html', 'utf8');
const document = new JSDOM(html).window.document;
assert.equal(document.querySelectorAll('h1').length, 1);
assert.match(document.querySelector('h1').textContent, /PRUDHVI.*CHARAN/);
assert.equal(document.querySelector('#hero a[href="#projects"]').textContent, 'View Work');
assert(!document.querySelector('meta[name="viewport"]').content.includes('maximum-scale'));
assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://prudhvicharan.com/');
assert.equal(document.querySelector('meta[property="og:image"]').content, 'https://prudhvicharan.com/social-preview.png');
assert(existsSync('out/social-preview.png'));
assert.match(readFileSync('out/robots.txt', 'utf8'), /Sitemap: https:\/\/prudhvicharan.com\/sitemap.xml/);
assert.match(readFileSync('out/sitemap.xml', 'utf8'), /<loc>https:\/\/prudhvicharan.com<\/loc>/);
const sections = [...document.querySelectorAll('main > section')].map(node => node.id);
assert.deepEqual(sections, ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact']);
for(const input of document.querySelectorAll('input, textarea')) {
 assert(input.id && document.querySelector(`label[for="${input.id}"]`));
}
for(const link of document.querySelectorAll('a[href^="#"]')) assert(document.getElementById(link.hash.slice(1)), `Missing anchor: ${link.hash}`);
for(const link of document.querySelectorAll('a')) assert(link.textContent.trim() || link.getAttribute('aria-label'), 'Unnamed link');
assert(document.querySelector('a[href="https://github.com/Prudhvicharan"]'));
assert(document.querySelector('a[href="https://www.linkedin.com/in/prudhvi-charan"]'));
assert(!html.includes('github.com/github.com'));
assert(!html.includes('linkedin.com/in/linkedin.com'));
assert.match(document.querySelector('#experience').textContent, /July 2026 – Present/);
assert.match(document.querySelector('#experience').textContent, /March 2025 – June 2026/);
assert(!document.querySelector('#contact form').getAttribute('method') || document.querySelector('#contact form').getAttribute('method') === 'post');
console.log('Export checks passed: SSR hero, section order, labels, named links, fragments, profile URLs, current dates, SEO files and preview.');
