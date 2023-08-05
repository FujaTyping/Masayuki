const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class EightBallCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('8ball').setDescription('Ask 8ball?')
                .addStringOption((option) => // Add option
                    option
                        .setName('prompt')
                        .setDescription('Enter want do to want to ask 8ball!')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🪄 Waiting for the magic`)
            .setTimestamp()
            .setFooter({ text: '8Ball API', iconURL: 'https://cdn.discordapp.com/attachments/1048572405867618354/1137417506726875286/favicon.png' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://www.eightballapi.com/api`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Magic of 8ball ✨`)
                        .setDescription(`- 🎱 Answer : ${info.reading}`)
                        .setTimestamp()
                        .setFooter({ text: '8Ball API', iconURL: 'https://cdn.discordapp.com/attachments/1048572405867618354/1137417506726875286/favicon.png' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ 8ball cannot answer your question`)
                        .setTimestamp()
                        .setFooter({ text: '8Ball API', iconURL: 'https://cdn.discordapp.com/attachments/1048572405867618354/1137417506726875286/favicon.png' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    EightBallCommand
};