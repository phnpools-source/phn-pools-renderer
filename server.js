const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;

app.post('/render', async (req, res) => {
  try {
    const { type = 'invoice', data = {} } = req.body;

    const templatePath = path.join(__dirname, 'templates', `${type}.html`);
    if (!fs.existsSync(templatePath)) {
      return res.status(400).send(`Template ${type}.html not found`);
    }

    let html = fs.readFileSync(templatePath, 'utf8');

    Object.keys(data).forEach(key => {
      const value = String(data[key] || '');
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    const browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });

    const pdfBuffer = await page.pdf({ 
      format: 'A4', 
      printBackground: true 
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="\( {type}- \){Date.now()}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Render error:', error);
    res.status(500).send('Error generating PDF: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('✅ PHN POOLS Renderer is running. POST to /render to generate PDFs.');
});

app.listen(PORT, () => {
  console.log(`🚀 PHN POOLS renderer running on port ${PORT}`);
});