/**********************
 * import libraries & set the libraries
 **********************/
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const devices = require('./devices');
const phone = devices['Galaxy S5'];

/**********************
 * start crawling
 **********************/
puppeteer.launch({
  headless : false, // ask whether to do headless mode or not
  // devtools : false, // ask whether to open dev mode or not
  // executablePath : puppeteer.executablePath(),
  // executablePath : "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", //크롬 브라우저 경로
  ignoreDefaultArgs: [
    "--enable-automation",
  ],
  timeout : 15000, // 브라우저 인스턴스가 시작될 때까지 대기하는 시간(밀리 초)
}).then(async (browser) => {
  // const context = await browser.createIncognitoBrowserContext();
  // const page = await context.newPage();
  const page = await browser.newPage();
  await page.emulate(phone);
  await page._client.send('Emulation.setEmitTouchEventsForMouse', { enabled: true });
  // await page._client.send('Emulation.setTouchEmulationEnabled', { enabled: true });
  await page.goto( 'https://www.naver.com/', { waitUntil: 'networkidle2' } );
  await page.waitFor(2000);

  await page.touchscreen.tap(50, 50);
  await page.mouse.click(50, 50, {delay:2000});
});
