const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class ShortCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('short').setDescription('Url is long?')
                .addStringOption((option) => // Add option
                    option
                        .setName('url')
                        .setDescription('Enter url that you want to short')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const OrignalUrl = interaction.options.getString('url')

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔗 Shorting url : ${OrignalUrl}`)
            .setTimestamp()
            .setFooter({ text: 'Shrtcode API', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1135986784073953410/favicon.png' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://api.shrtco.de/v2/shorten?url=${OrignalUrl}`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`🪄 Url have been short`)
                        .setDescription(`- 🔗 Short link (1) : ${info.result.short_link}\n- 🔗 Short link (2) : ${info.result.short_link2}\n- 🔗 Short link (3) : ${info.result.short_link3}`)
                        .addFields(
                            { name: '📤 Share link', value: `${info.result.share_link}`, inline: true },
                            { name: '🌐 Original link', value: `${OrignalUrl}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Shrtcode API', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1135986784073953410/favicon.png' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot short the url : ${OrignalUrl}`)
                        .setTimestamp()
                        .setFooter({ text: 'Shrtcode API', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1135986784073953410/favicon.png' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    ShortCommand
};