# EventHub Test Framework

Playwright-based end-to-end test framework and page-object library for the EventHub web application.

## What this is
A lightweight test framework built on Playwright Test and TypeScript that provides:

- Page Object classes for EventHub (Login, Home, Events, Bookings, Manage pages).
- A global setup that performs UI login and writes an authenticated storage state (loginConfig.json) so tests can run using a pre-authenticated context.
- Playwright configuration with multiple browser projects, HTML and Allure reporting.

## Stack
- Language(s): TypeScript
- Test framework: Playwright Test (configured in `playwright.config.ts`)
- Notable libraries: `@playwright/test`, `allure-playwright`, `dotenv`

## Repository structure
```
package.json                  # npm scripts and dependencies
playwright.config.ts          # Playwright Test configuration
global-setup.ts               # globalSetup script that creates loginConfig.json
loginConfig.json              # storageState used by tests (created by global-setup)
allure-results/               # Allure raw results (output)
reports/                      # HTML reports output
tests/
  config/
    config.ts                 # loads tests/config/env/<env>.env into process.env
    env/                      # (not committed) env files per environment (qa, etc.)
  pages/                      # Page Objects (POManager + individual pages)
  specs/                      # Test spec files (not present in repo yet)

```

## Quickstart — run tests locally
1. Install dependencies

```bash
npm ci
```

2. Provide environment variables

The test config reads from `tests/config/env/<env>.env` where `<env>` is set by the `TEST_ENV` environment variable (defaults to `qa`). Create `tests/config/env/qa.env` with the following keys:

```
BASE_URL=https://your.eventhub.url
USER_EMAIL=you@example.com
USER_PASSWORD=your_password
INVALID_EMAIL=invalid@example.com
INVALID_PASSWORD=invalid_password
API_URL=https://your.eventhub.api
```

You can also export variables in your shell or set `TEST_ENV` before runs:

```bash
export TEST_ENV=qa
```

3. Generate the authenticated storage state and run tests

The repository uses `global-setup.ts` to perform a login and write `loginConfig.json`. Running any test command will execute the global setup automatically.

- Run the suite on Chromium (fast local run):

```bash
npm run test:local
```

- Run the full test command (all projects as configured):

```bash
npm run test
```

- Run tagged subsets:

```bash
npm run test:smoke
npm run test:regression
```

4. Generate Allure report

```bash
npm run report:allure
# Output: ./allure-report
```

## Notes & troubleshooting
- Playwright looks for tests in `./tests/specs` (configured in `playwright.config.ts`). That directory currently isn't present — add your `.spec.ts` files there (example below).
- If you need to re-record the login storage state manually, delete `loginConfig.json` and re-run a test command to trigger the global setup.
- To run tests headed (non-headless), edit `playwright.config.ts` (set `headless: false`) or override in a command.
- Adjust `workers` in `playwright.config.ts` to tune parallelism for your machine.

## Example spec template
Save this as `tests/specs/login.spec.ts` to get started.

```ts
import { test, expect } from '@playwright/test';
import { POManager } from '../pages/POManager';

test('login with valid credentials', async ({ page }) => {
  const pomanager = new POManager(page);
  const loginPage = pomanager.loginPage;

  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

  // adapt this assertion to the app's landing page
  await expect(page).toHaveURL(/dashboard|home/);
});
```

## Example env file (tests/config/env/qa.env)

```
BASE_URL=https://your.eventhub.url
USER_EMAIL=you@example.com
USER_PASSWORD=your_password
INVALID_EMAIL=invalid@example.com
INVALID_PASSWORD=invalid_password
API_URL=https://your.eventhub.api
```

## Adding new page objects and tests
- Add new Page Object classes in `tests/pages/` and expose them via `POManager.ts`.
- Create specs under `tests/specs/` that import the POManager or page classes and drive scenarios.
- Use test annotations like `@smoke` or `@regression` (the repo uses `--grep '@smoke'`/`@regression` in npm scripts).

## CI and reporting suggestions
- Add a GitHub Actions workflow to run `npm ci` and `npm run test` on PRs and push the Allure report artifacts.
- Cache `~/.npm` and Playwright browsers to speed up runs.

## License
This repository is provided as-is. Add a LICENSE file if you need an explicit license.

---

If you want, I can also:
- Create an example `tests/specs/login.spec.ts` file in the repo.
- Add a `.github/workflows/playwright.yml` CI workflow to run tests and upload Allure artifacts.
