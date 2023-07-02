const { Listener } = require('@sapphire/framework');
const { ActivityType } = require('discord.js');

class ReadyListener extends Listener {
    run(client) {
        const { username, id } = client.user;
        this.container.logger.info("Masayuki is ready!");
        client.user.setPresence({ // Set custom status of bot
            activities: [{
                name: `at Akane High School`,
                type: ActivityType.Streaming,
                url: "https://www.twitch.tv/anime"
            }]
        });
    }
}

module.exports = {
    ReadyListener
};