const { MessageEmbed } = require("discord.js");
const gay = new Set();

class Message {
    constructor ( client ) {
        this.client = client;
        this.set = gay;
    }

    async run ( message ) {

        if (message.author.bot) return;

        const chance = Math.floor(Math.random() * 100 + 1);

        if (chance >= 50) {

            if (!this.set.has(message.guild.id)) {

                const gay = require("../../../Lib/WebScrap/webscrap");

                const retard = await gay("https://pokemondb.net/pokedex/national/");
                console.log(retard);
    
                const embed = new MessageEmbed()
                .setTitle("A pokemon has spawned")
                .setImage(retard.pokepic1);
    
                await message.channel.send(embed);
    
                const filter = m => !m.bot && m.author.id != this.client.user.id;
                const collector = message.channel.createMessageCollector(filter);
    
                collector.on("collect", async m => {
    
                    if (m.content.toLowerCase() === retard.pokename1.toLowerCase()) {
                        message.channel.send("woah you're not a retard and guessed correctly");
                        await collector.stop();
                    } else {
                        message.channel.send("retard you guessed incorrectly");
                    };
                });
    
                await this.set.add(message.guild.id);

                setTimeout(() => this.set.delete(message.guild.id), 30000);
            };

        };

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