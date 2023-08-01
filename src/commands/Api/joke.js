const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class JokeCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('joke').setDescription('Want some joke?')
        );
    }

    async chatInputRun(interaction) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔎 Finding joke for you`)
            .setTimestamp()
            .setFooter({ text: 'Joke API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://official-joke-api.appspot.com/random_joke`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Found joke for you ✨`)
                        .setDescription(`- 🃏 Joke : ${info.setup}\n- 📃 Answer : ||${info.punchline}|| (Click to reveal)`)
                        .addFields(
                            { name: '🧩 Type', value: `${info.type}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Joke API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find joke for you`)
                        .setTimestamp()
                        .setFooter({ text: 'Joke API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    JokeCommand
};