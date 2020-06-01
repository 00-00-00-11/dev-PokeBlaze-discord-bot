const puppeteer = require("puppeteer")

async function scrapeProduct ( url ) {
    const browser = await puppeteer.launch ();
    const page = await browser.newPage ();
    await page.goto ( url );

    var pokenum1 = (Math.floor ( Math.random () * 151 ));
console.log(pokenum1)
    if (pokenum1.toString ().length === 3) {
        const pokepic1 = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pokenum1 }.png`

        const [ el2 ] = await page.$x ( `html/body/main/div[3]/div[${ pokenum1 }]/span[2]/a` );
        const txt = await el2.getProperty ( 'textContent' );
        const pokename1 = await txt.jsonValue ();

        console.log ( { pokepic1,pokename1 } )
    } else
    if (pokenum1.toString ().length === 2) {
        const pokepic1 = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+"0"+`${ pokenum1 }.png`

        const [ el2 ] = await page.$x ( `html/body/main/div[3]/div[${ pokenum1 }]/span[2]/a` );
        const txt = await el2.getProperty ( 'textContent' );
        const pokename1 = await txt.jsonValue ();

        console.log ( { pokepic1, pokename1 } )
    } else
        if (pokenum1.toString ().length === 1) {
            const pokepic1 = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+"00"+`${ pokenum1 }.png`

            const [ el2 ] = await page.$x ( `html/body/main/div[3]/div[${ pokenum1 }]/span[2]/a` );
            const txt = await el2.getProperty ( 'textContent' );
            const pokename1 = await txt.jsonValue ();

            console.log ( { pokepic1, pokename1 } )
        }


    browser.close ();
}

scrapeProduct ( 'https://pokemondb.net/pokedex/national/' );