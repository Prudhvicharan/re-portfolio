import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#060810"/>
<rect x="64" y="72" width="8" height="486" fill="#00E5FF"/>
<text x="110" y="142" font-family="sans-serif" font-size="24" letter-spacing="4" fill="#00E5FF">FULL-STACK APPLICATION DEVELOPER</text>
<text x="104" y="290" font-family="sans-serif" font-size="88" font-weight="700" fill="#FFFFFF">PRUDHVI CHARAN</text>
<text x="110" y="375" font-family="sans-serif" font-size="30" fill="#A8B2C8">Applications. Data engineering. Production systems.</text>
<text x="110" y="445" font-family="sans-serif" font-size="26" fill="#A8B2C8">.NET / C# · SQL · Python · Azure · Databricks</text>
<text x="110" y="540" font-family="sans-serif" font-size="24" fill="#00E5FF">prudhvicharan.com</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/social-preview.png');
