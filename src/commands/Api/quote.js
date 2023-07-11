const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class QuoteCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('quote').setDescription('Do you want a quote?')
        );
    }

    async chatInputRun(interaction) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔎 Finding quote for you`)
            .setTimestamp()
            .setFooter({ text: 'Quotable API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://api.quotable.io/random`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Found quote for you ✨`)
                        .setDescription(`- 📃 Quote : ${info.content}\n- 📅 Date added : ${info.dateAdded}`)
                        .addFields(
                            { name: '👤 Author', value: `${info.author}`, inline: true },
                            { name: '🏷 Tags', value: `${info.tags}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Quotable API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find quote for you`)
                        .setTimestamp()
                        .setFooter({ text: 'Quotable API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    QuoteCommand
};