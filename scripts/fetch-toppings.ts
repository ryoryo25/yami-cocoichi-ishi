import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const URL = 'https://www.ichibanya.co.jp/menu/topping.html';
const BASE_URL = 'https://www.ichibanya.co.jp';

async function fetchToppings() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const toppings: { name: string; image: string }[] = [];

    // Updated selectors based on actual HTML inspection
    $('.lst-topping__name').each((_, el) => {
      const name = $(el).text().trim();
      if (name) {
        toppings.push({
          name,
          image: '', // No images found on the topping list page
        });
      }
    });

    // Deduplicate and filter empty names
    const uniqueToppings = toppings.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

    console.log(`Fetched ${uniqueToppings.length} toppings.`);

    fs.writeFileSync(
      path.join(process.cwd(), 'data/toppings.json'),
      JSON.stringify(uniqueToppings, null, 2)
    );
  } catch (error) {
    console.error('Error fetching toppings:', error);
    process.exit(1);
  }
}

fetchToppings();
