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
        await page.type('input[id=search-box]', 'Mr. Nice');
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
      });

      // Click that button to create a new hero
      it('should navigate to page "heroes"', async () => {
        await page.click('a[href="/heroes"]');
        await page.waitForSelector('.delete-button');
        expect(await page.$('.delete-button')).toBeDefined();
      });

      it('should type and save a new "hero"', async() => {
        const myButtons = await page.$$('button');
        for (let button of myButtons) {
          const iHtml = await page.evaluate(el => el.innerHTML, button);
          if (iHtml == 'Add New Hero') {
            await button.click();
            break;
          }
        }
        expect(await page.waitForSelector('input[placeholder="name"]')).toBeDefined();
      });
      
    });

  },
  timeout,
);
