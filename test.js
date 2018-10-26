// test.js
const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:4200/dashboard');
    }, timeout);

    describe('Default Heroes', () => {
      // The ToH main homepage should load without error
      it('should load without error', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('Tour of Heroes');
      });

      it('should contain four buttons of class "hero"', async () => {
        await page.waitForSelector('.hero');
        const buttons = await page.$$('.hero');

        expect(buttons.length).toEqual(4);
      });

      it('should contain search result for "hero search"', async () => {
        await page.type('input[id=search-box]', 'Mr. Nice', {delay: 20});
        await page.waitForSelector('.search-result');
        const result = await page.$eval('.search-result', (element) => {
          return element.innerHTML
        });
        expect(result).toEqual(' Mr. Nice ');
      });
    });

    describe('Adding a New Hero', () => {
      it('should contain button "Heroes"', async () => {
        expect(await page.$('a[href="/heroes"]')).toBeDefined();
      })
    });

  },
  timeout,
);
