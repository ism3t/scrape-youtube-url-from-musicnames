## YouTube Audio URL Extractor

This script automates searches on YouTube for a list of music names, extracts the URLs of the first search result for each music name, and saves these URLs to an output file. It uses Puppeteer for web scraping, FS for file operations, and Chalk for colorful console output.

### Prerequisites

- Node.js installed on your system.

### Setup

1. **Install dependencies**:
   ```bash
   npm install puppeteer chalk
   ```

2. **Create a `musicNames.txt` file**:
   - Place it in the same directory as the script.
   - Each line should contain a music name.

### Running the Script

1. **Using Node.js**:
   ```bash
   node ytscraper.mjs
   ```

2. **Using the provided batch file** (`run.bat`):
   - Ensure `run.bat` is in the same directory as the script.
   - Double-click `run.bat` to execute.

### Notes

- Adjust the `randomDelay` range if needed to better simulate human interaction.
- If you want to see the browser actions, set `headless` to `false` in the script.

---
