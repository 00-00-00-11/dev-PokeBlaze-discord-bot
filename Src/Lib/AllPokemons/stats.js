const puppeteer = require("puppeteer")
const pokes = require("./pokes.json")
const fs = require("fs")
    async function scrapeProduct ( url ) {
        const browser = await puppeteer.launch ();
        const page = await browser.newPage ();
        await page.goto ( url );

        for (let i = 1 ; i < 1030 ; i++) {
            const [ el ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[2]/small` );

            if ( !el ) {

                const [ elm ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[1]/span[2]` );
                const global = await elm.getProperty ( 'textContent' );
                const number = await global.jsonValue ();

                const [ el ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[5]` );
                const txt0 = await el.getProperty ( 'textContent' );
                const health = await txt0.jsonValue ();

                const [ el1 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[6]` );
                const txt1 = await el1.getProperty ( 'textContent' );
                const atk = await txt1.jsonValue ();


                const [ el2 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[7]` );
                const txt2 = await el2.getProperty ( 'textContent' );
                const def = await txt2.jsonValue ();


                const [ el3 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[8]` );
                const txt3 = await el3.getProperty ( 'textContent' );
                const spatk = await txt3.jsonValue ();


                const [ el4 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[9]` );
                const txt4 = await el4.getProperty ( 'textContent' );
                const spdef = await txt4.jsonValue ();


                const [ el5 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[10]` );
                const txt5 = await el5.getProperty ( 'textContent' );
                const spd = await txt5.jsonValue ();

                const [ el6 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[4]` );
                const txt6 = await el6.getProperty ( 'textContent' );
                const ttl = await txt6.jsonValue ();


                const [ el7 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[2]/a` );
                const txt7 = await el7.getProperty ( 'textContent' );
                const name = await txt7.jsonValue ();
                const pic = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + `${ number }.png`

                pokes[ `${ number }` ] = {
                    Name : name ,
                    Pic : pic ,
                    Health : health ,
                    attack : atk ,
                    defence : def ,
                    specialatk : spatk ,
                    specialdefence : spdef ,
                    speed : spd ,
                    total : ttl
                }

                console.log ( pokes )

                fs.writeFileSync ( "./pokes.json" , JSON.stringify ( pokes , null , 4 ) );

            } else {
                const [ el69 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[2]/small` );
                const txt = await el69.getProperty ( 'textContent' );
                const gal = await txt.jsonValue ()


                const [ elm ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[5]` );
                const txtm = await elm.getProperty ( 'textContent' );
                const number = await txtm.jsonValue ();

                const [ el ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[5]` );
                const txt0 = await el.getProperty ( 'textContent' );
                const health = await txt0.jsonValue ();

                const [ el1 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[6]` );
                const txt1 = await el1.getProperty ( 'textContent' );
                const atk = await txt1.jsonValue ();


                const [ el2 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[7]` );
                const txt2 = await el2.getProperty ( 'textContent' );
                const def = await txt2.jsonValue ();


                const [ el3 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[8]` );
                const txt3 = await el3.getProperty ( 'textContent' );
                const spatk = await txt3.jsonValue ();


                const [ el4 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[9]` );
                const txt4 = await el4.getProperty ( 'textContent' );
                const spdef = await txt4.jsonValue ();


                const [ el5 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[10]` );
                const txt5 = await el5.getProperty ( 'textContent' );
                const spd = await txt5.jsonValue ();

                const [ el6 ] = await page.$x ( `//*[@id="pokedex"]/tbody/tr[${ i }]/td[4]` );
                const txt6 = await el6.getProperty ( 'textContent' );
                const ttl = await txt6.jsonValue ();
                const mega = pokes.mega
                const galarian = pokes.galarian
                const alolan = pokes.alolan
                const x = mega.x
                const y = mega.y
                if ( !gal.startsWith ( "Mega" ) ) {
                    if ( gal.startsWith ( "Galarian" ) ) {
                        galarian[ `${ number }` ] = {
                            Name : gal ,
                            Pic : "pic here in future" ,
                            number : number ,
                            Health : health ,
                            attack : atk ,
                            defence : def ,
                            specialatk : spatk ,
                            specialdefence : spdef ,
                            speed : spd ,
                            total : ttl
                        }
                        fs.writeFileSync ( "./pokes.json" , JSON.stringify ( galarian , null , 4 ) )
                    } else {
                        if ( gal.startsWith ( "Alolan" ) ) {
                            alolan[ `${ number }` ] = {
                                Name : gal ,
                                Pic : "pic here in future" ,
                                number : number ,
                                Health : health ,
                                attack : atk ,
                                defence : def ,
                                specialatk : spatk ,
                                specialdefence : spdef ,
                                speed : spd ,
                                total : ttl
                            }
                            fs.writeFileSync ( "./pokes.json" , JSON.stringify ( alolan , null , 4 ) )
                        } else {
                            console.log("Something Special")
                        }
                    }
            }
                 else {
                    if ( gal.endsWith ( "X" ) ) {
                        x[ `${ number }` ] = {
                            Name : gal ,
                            Pic : "pic here in future" ,
                            number : number ,
                            Health : health ,
                            attack : atk ,
                            defence : def ,
                            specialatk : spatk ,
                            specialdefence : spdef ,
                            speed : spd ,
                            total : ttl
                        }
                        fs.writeFileSync("./pokes.json", JSON.stringify(x, null, 4))
                    } else {
                        if ( gal.endsWith ( "Y" ) ) {
                            y[ `${ number } ` ] = {
                                Name : gal ,
                                Pic : "pic here in future" ,
                                number : number ,
                                Health : health ,
                                attack : atk ,
                                defence : def ,
                                specialatk : spatk ,
                                specialdefence : spdef ,
                                speed : spd ,
                                total : ttl
                            }
                            fs.writeFileSync("./pokes.json", JSON.stringify(y, null, 4))
                        } else {
                            mega[`${ number }`] = {
                                Name : gal ,
                                Pic : "pic here in future" ,
                                number : number ,
                                Health : health ,
                                attack : atk ,
                                defence : def ,
                                specialatk : spatk ,
                                specialdefence : spdef ,
                                speed : spd ,
                                total : ttl
                            }
                            fs.writeFileSync("./pokes.json", JSON.stringify(mega, null, 4))
                        }
                    }
                }
            }
        }
        browser.close();
}
scrapeProduct ( `https://pokemondb.net/pokedex/all` );