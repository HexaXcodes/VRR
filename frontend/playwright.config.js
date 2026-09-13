import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests', testMatch: '*.spec.js', fullyParallel: false, workers: 1, timeout: 30000, reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5174', browserName: 'chromium', channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: [
    { command: 'node tests/api-server.mjs', url: 'http://127.0.0.1:5099/api/health', timeout: 180000, reuseExistingServer: false },
    { command: 'npm run dev -- --host 127.0.0.1 --port 5174 --strictPort', url: 'http://127.0.0.1:5174', reuseExistingServer: false, env: { VITE_API_URL: 'http://127.0.0.1:5099/api' } },
  ],
})
