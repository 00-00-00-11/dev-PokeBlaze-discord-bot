const puppeteer = require("puppeteer")

module.exports = async function scrapeProduct(url) {
    const browser = await puppeteer.launch ();
    const page = await browser.newPage ();
    await page.goto ( url );

    const pokenum1 = (Math.floor ( Math.random () * 72 ));
    console.log(pokenum1)

    const pokepic1 = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pokenum1 + 649 }.png`

    const [ el2 ] = await page.$x ( `/html/body/main/div[8]/div[${pokenum1}]/span[2]/a` );
    const txt = await el2.getProperty ( 'textContent' );
    const pokename1 = await txt.jsonValue ();

    return ({ pokepic1, pokename1 });

}
