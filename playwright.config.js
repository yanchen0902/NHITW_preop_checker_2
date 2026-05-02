import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    headless: true, // we can use headless 'new' or true, but extensions require special handling, let's see if headless works
  },
});
