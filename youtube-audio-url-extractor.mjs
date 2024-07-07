import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const musicNamesFilePath = path.join(process.cwd(), 'musicNames.txt');
const outputFilePath = path.join(process.cwd(), 'outputUrls.txt');
const musicNames = fs.readFileSync(musicNamesFilePath, 'utf-8').split('\n').filter(name => name.trim() !== '');

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

(async () => {
  console.log(chalk.cyan('Starting Puppeteer script...\n'));

  const browser = await puppeteer.launch({
    headless: true,
   // executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe', // Path to Brave executable
  });
  const page = await browser.newPage();
  const urls = [];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomDelay = getRandomInt(350, 450); 

  for (let i = 0; i < musicNames.length; i++) {
    const searchTerm = musicNames[i].trim() + " audio";
    console.log(chalk.yellow(`Searching for: ${chalk.bold(searchTerm)}`));

    await page.goto('https://www.youtube.com/results?search_query=' + searchTerm);
    await delay(randomDelay);
    
    const videoUrl = await page.evaluate(() => {
      const firstVideo = document.querySelector('a#video-title');
      return firstVideo ? firstVideo.href : null;
    });

    if (videoUrl) {
      console.log(chalk.cyan(`Found URL: ${chalk.bold(videoUrl)}\n`));
    } else {
      console.log(chalk.red(`No URL found for: ${chalk.bold(searchTerm)}\n`));
    }
    
    urls.push(videoUrl);
    await delay(randomDelay);
  }

  // Write URLs to a text file
  fs.writeFileSync(outputFilePath, urls.join('\n'), 'utf-8');
  console.log(chalk.blueBright(`\nOutput written to: ${chalk.magentaBright(outputFilePath)}`));
  await browser.close();

  console.log(chalk.green('\nScript completed successfully!'));
})();
