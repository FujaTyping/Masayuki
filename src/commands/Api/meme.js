const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class MemeCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('meme').setDescription('Do you like meme?')
        );
    }

    async chatInputRun(interaction) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔎 Finding meme for you`)
            .setTimestamp()
            .setFooter({ text: 'Meme API', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1127448544073220116/0-7757_reddit-logo-reddit-icon-png-removebg-preview_1.png' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://meme-api.com/gimme`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Found meme for you ✨`)
                        .setDescription(`📃 Caption : ${info.title}`)
                        .addFields(
                            { name: '👤 Author', value: `${info.author}`, inline: true },
                            { name: '🌳 Subreddit', value: `${info.subreddit}`, inline: true },
                        )
                        .setImage(`${info.url}`)
                        .setTimestamp()
                        .setFooter({ text: 'Meme API', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1127448544073220116/0-7757_reddit-logo-reddit-icon-png-removebg-preview_1.png' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find meme for you`)
                        .setTimestamp()
                        .setFooter({ text: 'Meme API', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1127448544073220116/0-7757_reddit-logo-reddit-icon-png-removebg-preview_1.png' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    MemeCommand
};