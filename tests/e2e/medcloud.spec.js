import { test, expect } from '@playwright/test';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('should display floating button, open modal, and show correct alerts', async ({ page }) => {
  const mockHtmlPath = path.resolve(__dirname, '../fixtures/mock_medcloud.html');
  const mockHtml = fs.readFileSync(mockHtmlPath, 'utf8');

  // Find the generated JS bundle in dist/assets
  const assetsDir = path.resolve(__dirname, '../../dist/assets');
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.endsWith('.js'));
  const jsCode = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('file://' + mockHtmlPath);

  // Inject the bundled extension JS into the page directly
  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = code;
    document.body.appendChild(script);
  }, jsCode);

  // 1. Check if the floating button is injected and visible
  const floatingBtn = page.locator('#preop-checker-btn');
  await expect(floatingBtn).toBeVisible({ timeout: 5000 });

  // 2. Click the floating button to open the modal
  await floatingBtn.click();

  // 3. Check if the modal is visible
  const modal = page.locator('#preop-modal-backdrop');
  await expect(modal).toBeVisible();

  // 4. Assert that the correct high-risk drugs are found
  const modalContent = await modal.innerText();
  expect(modalContent).toContain('STEGLUJAN'); // SGLT2 (within 90 days)
  expect(modalContent).toContain('PLAVIX');    // Antiplatelet
  expect(modalContent).toContain('ELIQUIS');   // Anticoagulant
  expect(modalContent).toContain('OZEMPIC');   // GLP-1 RA

  // This should NOT be found because it's 120 days old (older than 90 days threshold)
  expect(modalContent).not.toContain('XARELTO');
});
