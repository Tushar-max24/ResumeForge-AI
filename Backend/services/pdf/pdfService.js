const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const env = require('../../config/env');

const generatePDF = async (htmlContent, filename) => {
  const outputDir = path.join(__dirname, '../../', env.PDF_OUTPUT_DIR);
  await fs.ensureDir(outputDir);
  const outputPath = path.join(outputDir, `${filename}.pdf`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for better rendering
    await page.setViewport({ width: 1200, height: 1600 });
    
    // Set content and wait for it to be loaded
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Inject Tailwind if needed (though usually HTML will have styles or links)
    // For now assume htmlContent is self-contained with styles

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    });

    return outputPath;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  } finally {
    await browser.close();
  }
};

module.exports = {
  generatePDF,
};
