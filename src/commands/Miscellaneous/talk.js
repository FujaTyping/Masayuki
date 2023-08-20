const { Command } = require('@sapphire/framework');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')
const { id } = require('../../config.json');

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
        const Server = message.guild;
        const Author = message.author.username;

        if (await Server.members.fetch(id)) {
            const User = Server.members.cache.get(id);
            const Permissions = User.permissions;

            if (Permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                message.delete();
                return message.channel.send(Msg);
            } else {
                const Error = new EmbedBuilder()
                    .setColor(14425658)
                    .setTitle(`💢 Require permission`)
                    .setDescription("⚠ Sorry " + Author + " , This feature is require `ManageMessages` permission to run\nPlease add : `ManageMessages` permission to Masayuki to run this feature")
                    .setTimestamp()

                return message.channel.send({ embeds: [Error] });
            }
        }

    }
}

module.exports = {
    TalkCommand
};