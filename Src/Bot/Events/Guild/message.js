const { MessageEmbed } = require("discord.js");
const poke = new Set();

class Message {
    constructor ( client ) {
        this.client = client;
        this.set = poke;
    }
    async run ( message ) {
        const Gen = ["Gen1", "Gen2", "Gen3", "Gen4", "Gen5", "Gen6", "Gen7", "Gen8"]
        const GentoSpawn = Gen[Math.floor(Math.random() * Gen.length)];
        if (message.author.bot) return;
        const chance = Math.floor(Math.random() * 100 + 1);
        if (chance >= 90) {
            if (!this.set.has(message.guild.id)) {
                const spawn = require("../../../Lib/Gens/"+`${GentoSpawn}`);

                const correct = await spawn("https://pokemondb.net/pokedex/national/");
                console.log(correct);
    
                const embed = new MessageEmbed()
                .setTitle("A pokemon has spawned")
                .setImage(correct.pokepic1)
                .setColor("#FF0000");
                await message.channel.send(embed);
                const filter = m => !m.bot && m.author.id !== this.client.user.id;
                const collector = message.channel.createMessageCollector(filter);
                collector.on("collect", async m => {
                    if (m.content.toLowerCase() === correct.pokename1.toLowerCase()) {
                        const embed = new MessageEmbed()
                            .setThumbnail(correct.pokepic1)
                            .setDescription(`${m.author} has just caught a wild ${correct.pokename1} `)
                            .setColor("#008000")
                        message.channel.send(embed);
                        await collector.stop();
                    } else {
                       console.log("nonfood")
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