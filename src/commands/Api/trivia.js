const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class TriviaCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('trivia').setDescription('Challenge trivia questions!')
        );
    }

    async chatInputRun(interaction) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔎 Finding questions for you`)
            .setTimestamp()
            .setFooter({ text: 'Trivia API', iconURL: 'https://cdn.discordapp.com/attachments/1073442486694969364/1137436166233280512/favicon.png' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://opentdb.com/api.php?amount=1`)
                .then(response => {
                    const info = response.data;
                    const Incorrect_answers = info.results[0].incorrect_answers
                    const Incorrect = Incorrect_answers.join(' , ');

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Found questions for you ✨`)
                        .setDescription(`- ⁉️ Question : ${info.results[0].question}\n- 📃 Answer : ||${info.results[0].correct_answer}|| (Click to reveal)\n- ❌ Incorrect answers : ||${Incorrect}|| (Click to reveal)`)
                        .addFields(
                            { name: '📑 Category', value: `${info.results[0].category}`, inline: true },
                            { name: '🧩 Type', value: `${info.results[0].type}`, inline: true },
                            { name: '🎲 Difficulty', value: `${info.results[0].difficulty}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Trivia API', iconURL: 'https://cdn.discordapp.com/attachments/1073442486694969364/1137436166233280512/favicon.png' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find questions for you`)
                        .setTimestamp()
                        .setFooter({ text: 'Trivia API', iconURL: 'https://cdn.discordapp.com/attachments/1073442486694969364/1137436166233280512/favicon.png' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    TriviaCommand
};