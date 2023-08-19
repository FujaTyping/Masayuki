const { Command } = require('@sapphire/framework');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

class TalkCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'talk',
            aliases: ['tk'],
            description: 'echo the message that you sent'
        });
    }

    async messageRun(message, args) {

        const Author = message.author.username

        const Warn = new EmbedBuilder()
            .setColor(14425658)
            .setTitle("💥 Feature unavailable")
            .setDescription(`⚠ Sorry ` + `${Author}` + ", Masayuki `!!talk (tk)` feature is unavailable right now!\nThis command require `DELETE_MESSAGE (MANAGE_MESSAGE)` permission\nNow we're fixing the Masayuki default permission")
            .setTimestamp()

        const msg = await message.channel.send({ embeds: [Warn] });

    }
}

module.exports = {
    TalkCommand
};