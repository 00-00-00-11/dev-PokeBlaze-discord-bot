class Ready {
    constructor(client) {
        this.client = client;
    }

    async run() {
        console.log(
            `Hi, ${this.client.user.username} is now online.
    - Serving ${this.client.guilds.cache.size} Guilds
    - Listening users say "b!start" from ${this.client.users.cache.size} Users
    `
        );
        let activities = [
                `Watching ${this.client.guilds.cache.size} servers!`,
                `Spawning Pokemons in ${this.client.channels.cache.size} channels!`,
                `Listening to${this.client.users.cache.size} users! saying b!start`,
            ],
            i = 0;

        setInterval(
            () =>
                this.client.user.setActivity(
                    `${activities[i++ % activities.length]}`,
                    { type: "PLAYING" }
                ),
            15000
        );
    }
    }
    module.exports = Ready;