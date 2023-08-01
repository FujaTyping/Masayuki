const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class BoredCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('bored').setDescription('Did you feel bored?')
        );
    }

    async chatInputRun(interaction) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔎 Finding activities for you to do`)
            .setTimestamp()
            .setFooter({ text: 'Bored API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`http://www.boredapi.com/api/activity/`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`If you bored do this ✨`)
                        .setDescription(`- 🎮 Activities : ${info.activity}`)
                        .addFields(
                            { name: '🧩 Type', value: `${info.type}`, inline: true },
                            { name: '👥 Participants', value: `${info.participants}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Bored API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find any activities for you to do`)
                        .setTimestamp()
                        .setFooter({ text: 'Bored API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    BoredCommand
};