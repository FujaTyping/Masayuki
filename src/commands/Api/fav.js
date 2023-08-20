const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class FavCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('fav').setDescription('Get favicon!')
                .addStringOption((option) => // Add option
                    option
                        .setName('url')
                        .setDescription('Enter url that you want to get favicon')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const Domain = interaction.options.getString('url')

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔗 Getting favicon : ${Domain}`)
            .setTimestamp()
            .setFooter({ text: 'Favicongrabber API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://favicongrabber.com/api/grab/${Domain}`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`⚡ Found favicon`)
                        .setDescription(`- 🌐 Domain : ${info.domain}\n- 🧩 Type : ${info.type}\n- 🖼 Favicon : ${info.icons[0].src}`)
                        .setThumbnail(`${info.icons[0].src}`)
                        .setTimestamp()
                        .setFooter({ text: 'Favicongrabber API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Can't find favicon from url : ${Domain}`)
                        .setTimestamp()
                        .setFooter({ text: 'Favicongrabber API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    FavCommand
};