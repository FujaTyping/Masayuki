const { Command } = require('@sapphire/framework');
const { EmbedBuilder, ActivityType } = require('discord.js')
const { owner } = require('../config.json');

class StatusCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'status',
            aliases: ['ss'],
            description: 'change bot rich presence'
        });
    }

    async messageRun(message, args) {

        const Client = this.container.client
        const Msg = await args.rest('string');

        async function Main() {
            Client.user.setPresence({ // Set custom status of bot
                activities: [{
                    name: `${Msg}`,
                    type: ActivityType.Streaming,
                    url: "https://www.twitch.tv/anime"
                }]
            });

            const Content = new EmbedBuilder()
                .setColor(14425658)
                .setTitle(`Updated status ✅`)
                .setDescription(`- 👦🏻 Update status name : ${Msg}\n- 🧩 Type : Streaming\n- 🔗 Url : https://www.twitch.tv/anime`)
                .setTimestamp()

            const msg = await message.channel.send({ embeds: [Content] });
        }

        if (owner == message.author.id) {
            Main()
        } else {
            const Error = new EmbedBuilder()
                .setColor(14425658)
                .setTitle(`💢 Require permission`)
                .setDescription(`⚠ Sorry ${Author} , This feature is for owner only!`)
                .setTimestamp()

            return message.channel.send({ embeds: [Error] });
        }

    }
}

module.exports = {
    StatusCommand
};