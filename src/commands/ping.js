const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js')

class PingCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('ping').setDescription('Wana play ping-pong?')
        );
    }

    async chatInputRun(interaction) {

        const Content = new EmbedBuilder()
            .setColor(14425658)
            .setTitle('🏓  Pong')
            .setDescription('Want to play ping-pong with me?')
            .setTimestamp()

        const msg = await interaction.reply({ embeds: [Content], fetchReply: true });

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);

            const Content = new EmbedBuilder()
                .setColor(14425658)
                .setTitle('🏓  Pong')
                .setDescription(`Want to play ping-pong with me?\n\n🧠 : My ping : ${diff} ms\n💓 : Heartbeat : ${ping} ms`)
                .setTimestamp()

            return interaction.editReply({ embeds: [Content] });
        }

    }
}

module.exports = {
    PingCommand
};