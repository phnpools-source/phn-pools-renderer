const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('.')); // serves assets folder (logo)

const PORT = process.env.PORT || 3000;

app.post('/render', async (req, res) => {
  const { type, data } = req.body;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const templatePath = path.join(__dirname, 'templates', `${type}.html`);
  let html = fs.readFileSync(templatePath, 'utf8');

  Object.keys(data).forEach(key => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key] || '');
  });

  await page.setContent(html, { waitUntil: 'networkidle' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
});

app.listen(PORT, () => console.log(`🚀 PHN POOLS renderer running on port ${PORT}`));
