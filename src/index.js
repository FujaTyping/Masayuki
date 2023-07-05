const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js');
const { prefix } = require('./config.json');

require('dotenv').config() // Use .env file
const discord_token = process.env.discord_token

const express = require('express') // Host web service
const app = express()

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
        // Send a simple message
        app.get('/', function (req, res) {
            res.send('Hi - From Masayuki')
        })
        app.listen(1317)
        client.logger.info('Web service is ready!');
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
};

main();