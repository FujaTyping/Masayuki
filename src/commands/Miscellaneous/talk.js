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

        const Msg = await args.rest('string');
        message.delete();
        return message.channel.send(Msg);

    }
}

module.exports = {
    TalkCommand
};