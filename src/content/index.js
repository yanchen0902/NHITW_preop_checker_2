import { createFloatingButton } from './ui.js';
import { scanTables } from './scanner.js';
import './style.css';

function ensureButtonExists() {
  const currentUrl = window.location.href;
  if (currentUrl.includes('nhi.gov.tw') || currentUrl.includes('mock_medcloud.html')) {
    createFloatingButton(() => scanTables());
  }
}

const observer = new MutationObserver(() => {
  ensureButtonExists();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ensureButtonExists();
    observer.observe(document.body, { childList: true, subtree: true });
  });
} else {
  ensureButtonExists();
  observer.observe(document.body, { childList: true, subtree: true });
}
