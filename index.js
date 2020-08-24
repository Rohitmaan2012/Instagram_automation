const puppeteer = require('puppeteer');      //installed puppeteer for requirement
const data = require("./config.json");
let noOfPost = process.argv[2];
(async function() {
  const browser = await puppeteer.launch({headless:false});  //with puppeteer new browser is launched
  const page = await browser.newPage();                      //created newpage/tab
  await page.goto('https://www.instagram.com/', {waitUntil:"networkidle2"});  //with goto function we can go to any url in browser
  //await page.screenshot({path: 'example.png'});            //took ss of the page
  
  //LOGIN PAGE
  await page.type("input[name='username']", data.username, {delay:100});
  await page.type("input[name='password']", data.password, {delay:100});
  await Promise.all([
      page.waitForNavigation({waitUntil:"networkidle2"}),
      page.click("button[type='submit']"),
  ]);
  //SEARCH NAME
  await page.type("input[placeholder='Search']", "james clear", {delay:100});
  await page.waitForSelector(".drKGC .fuqBx a", {visible:true});
  await Promise.all([
      page.waitForNavigation({waitUntil:"networkidle2"}),
      page.click(".drKGC .fuqBx a"),
  ]);
  //VIEW IMAGE
  await page.waitForSelector("._9AhH0", {visible:true});
  await Promise.all([
    page.waitForNavigation({waitUntil:"networkidle2"}),
    page.click("._9AhH0"),
  ]);
  let i=0;
  while(i<noOfPost) {
    //LIKE IMAGE
    await page.waitForSelector(".fr66n button", {visible:true});
    await page.click(".fr66n button"),  //".fr66n"//".fr66n .wpO6b"//".fr66n .wp06b button"
    //NEXT IMAGE
    await page.waitForSelector("._65Bje.coreSpriteRightPaginationArrow", {visible:true});
    await Promise.all([
      page.waitForNavigation({waitUntil:"networkidle2"}),
      page.click("._65Bje.coreSpriteRightPaginationArrow"),
    ]);
    i++;
  }
  await browser.close();                                   //browser closed
})();