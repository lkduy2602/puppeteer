import puppeteer from 'puppeteer';

(async () => {
  const pageUrl = 'https://crm.techres.vn';

  const yanmail = '';
  const password = '';

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (request.url().includes('/timekeeping.check-in')) {
      const postData = JSON.stringify({
        ip: '113.161.44.191',
        lat: '10.812619',
        long: '106.668547',
        branch_id: 2,
      });

      request.continue({
        postData: postData,
      });
    } else if (request.url().includes('timekeeping.check-out')) {
      const postData = JSON.stringify({
        ip: '113.161.44.191',
        lat: '10.812619',
        long: '106.668547',
      });
      request.continue({
        postData: postData,
      });
    } else {
      request.continue();
    }
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions(pageUrl, ['geolocation']);

  // Navigate the page to a URL
  await page.goto(pageUrl);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const yandexMailSelector = '#yandex-mail';
  await page.waitForSelector(yandexMailSelector);
  await page.type(yandexMailSelector, yanmail);

  const passwordSelector = '#password';
  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, password);
})();
