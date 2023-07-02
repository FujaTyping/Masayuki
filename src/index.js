const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const { prefix, discord_token } = require('./config.json');

const client = new SapphireClient({
    defaultPrefix: prefix, // Custom prefix
    disableMentionPrefix: true, // Disable @Bot prefix
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true, // Use commands folder
});

const main = async () => {
    try {
        client.logger.info('Masayuki is waking up...');
        await client.login(discord_token);
        client.logger.info('Masayuki is wake up!');
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
};

main();