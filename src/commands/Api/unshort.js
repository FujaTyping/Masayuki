const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class UnShortCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('unshort').setDescription('See original url!')
                .addStringOption((option) => // Add option
                    option
                        .setName('url')
                        .setDescription('Enter url that you want to see original')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const ShortUrl = interaction.options.getString('url')

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔗 Unshorting url : ${ShortUrl}`)
            .setTimestamp()
            .setFooter({ text: 'Unshorten.me API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://unshorten.me/json/${ShortUrl}`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`🪄 Unshort the url`)
                        .setDescription(`- 🔗 Resolved url : ${info.resolved_url}\n- 🌐 Original url : ${info.requested_url}\n- ✅ Success : ${info.success}`)
                        .setTimestamp()
                        .setFooter({ text: 'Unshorten.me API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot unshort the url : ${ShortUrl}`)
                        .setTimestamp()
                        .setFooter({ text: 'Unshorten.me API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    UnShortCommand
};