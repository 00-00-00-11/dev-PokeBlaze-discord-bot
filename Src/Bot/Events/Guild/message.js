const { MessageEmbed } = require ( "discord.js" );
const poke = new Set ();
const Pokemon = require ( "../../../Lib/Database/Models/pokemon" );
const PlayerInfo = require ( "../../../Lib/Database/Models/playerinfo" )

class Message {
    constructor ( client ) {
        this.client = client;
        this.set = poke;
    }

    async run ( message ) {
        let health = Math.floor ( Math.random () * 31 );
        let spatk = Math.floor ( Math.random () * 31 );
        let atk = Math.floor ( Math.random () * 31 );
        let def = Math.floor ( Math.random () * 31 );
        let spd = Math.floor ( Math.random () * 31 );
        let spdef = Math.floor ( Math.random () * 31 );
        let iv = Math.floor ( Math.ceil(atk + health + spatk + spdef + def + spd) / (31 * 6) *100 );
        if ( message.author.bot ) return;
        const chance = Math.floor ( Math.random () * 100 + 1 );
        if ( chance >= 98 ) {
            if ( !this.set.has ( message.guild.id ) ) {
                const spawn = require("../../../Lib/AllPokemons/pokes.json")
                const Randomizer = Math.floor(Math.random()*880)
                const Stringed = Randomizer.toLocaleString()
                const correct = spawn[`${Stringed}`]
                console.log ( correct );

                const embed = new MessageEmbed ()
                .setTitle("A pokemon has spawned")
                .setImage(correct.pic)
                .setColor("#FF0000");
                await message.channel.send(embed);
                const filter = m => !m.bot && m.author.id !== this.client.user.id;
                const collector = message.channel.createMessageCollector(filter);
                collector.on("collect", async m => {
                    if (m.content.toLowerCase() === correct.name.toLowerCase()) {
                        const starterSettings = await PlayerInfo.findOne ( { userID : message.author.id } ) || new PlayerInfo ( {
                            userID : message.author.id
                        } );
                        const { numberofpokes, starterchoosen } = starterSettings;
                        if ( !starterchoosen ) return message.channel.send ( "Please use the command b!start before starting to catch pokemons" );
                        await PlayerInfo.findOne ( { userID : m.author.id },async ( err,numberofpokes ) => {
                            if ( err ) console.log ( err );
                            if ( !numberofpokes ) {
                                const newPlayerInfo = new PlayerInfo ( {
                                    userName : message.author.username,
                                    userID : message.author.id,
                                    numberofpokes : +1
                                } );
                                await newPlayerInfo.save ().catch ( err => console.log ( err ) );
                            }
                            numberofpokes.numberofpokes = numberofpokes.numberofpokes + +1
                            numberofpokes.save ().catch ( err => console.log ( err ) );
                        } );
                        await Pokemon.findOne ( { userID : m.author.id },async ( err,pokeName,pokeNumber,selected,pokePic,Health,spAtk,SpDef,Def,Atk,speed,IVTOTAL ) => {
                            if ( err ) console.log ( err );
                            if ( !pokeName || !pokePic || !pokeNumber || !selected || !Health || !spAtk || !SpDef || Def || !Atk || !speed || IVTOTAL ) {
                                const newPokemon = new Pokemon ( {
                                    userName : m.author.username,
                                    userID : m.author.id,
                                    pokeName : correct.pic,
                                    pokePic : correct.name,
                                    pokeNumber : numberofpokes + 1,
                                    selected: false,
                                    Health : health,
                                    spAtk : spatk,
                                    SpDef : spdef,
                                    Def : def,
                                    Atk : atk,
                                    speed : spd,
                                    IVTOTAL : iv,
                                } );
                                await newPokemon.save ().catch ( err => console.log ( err ) );
                            }
                        } );
                        const embed = new MessageEmbed ()
                            .setThumbnail ( correct.pic )
                            .setDescription ( `${ m.author } has just caught a wild ${ correct.name } ` )
                            .setColor ( "#008000" )
                        await message.channel.send ( embed );
                        await collector.stop ();
                    } else {

                    }
                });
                await this.set.add(message.guild.id);
                setTimeout(() => this.set.delete(message.guild.id), 30000);
            }
        }



        if ( message.author.bot || !message.content.startsWith ( "b!" ) ) return;
        const args = message.content.split ( /\s+/g );
        const command = args.shift ().slice ( "b!".length );
        const cmd = this.client.commands.get ( command ) || this.client.commands.get ( this.client.aliases.get ( command ) );
        if ( !cmd ) return;
        if ( cmd.cooldown.has ( message.author.id ) ) return message.channel.send ( `Sorry, you need to wait till the cooldown ends as due to our low specification system we have a cooldown but you can can help by donating in [paypal](https://paypal.me/roahgaming)` );
        cmd.setMessage ( message );
        cmd.run ( this.client , message , args );
        if ( cmd.conf.cooldown > 0 ) cmd.startCooldown ( message.author.id );

    }
}

module.exports = Message;