const puppeteer = require("puppeteer")

async function scrapeProduct ( url ) {
    const browser = await puppeteer.launch ();
    const page = await browser.newPage ();
    await page.goto ( url );

    const [ el ] = await page.$x ( '/html/body/main/div[3]/div[1]/span[1]/a/img' );
    const src = await el.getProperty ( 'src' );
    const pokepic1 = await src.jsonValue ();

    const [ el2 ] = await page.$x ( '/html/body/main/div[3]/div[1]/span[2]/a' );
    const txt = await el2.getProperty ( 'textContent' );
    const pokename1 = await txt.jsonValue ();

    console.log ( { pokepic1,pokename1 } )

    browser.close ();
}

scrapeProduct ( 'https://pokemondb.net/pokedex/national' );