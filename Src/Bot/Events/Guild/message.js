class Message {
    constructor ( client ) {
        this.client = client;
    }

    async run ( message ) {
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