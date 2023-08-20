const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class DecisionCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('decision').setDescription('Yes or No?')
                .addStringOption((option) => // Add option
                    option
                        .setName('prompt')
                        .setDescription('Enter want do to want to decision')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const Prompt = interaction.options.getString('prompt')

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`💨 Making a decision for you`)
            .setTimestamp()
            .setFooter({ text: 'Yesno.wtf API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://yesno.wtf/api`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`🧲 Result of decision`)
                        .setDescription(`- 📃 Answer : ${info.answer}`)
                        .setImage(`${info.image}`)
                        .setTimestamp()
                        .setFooter({ text: 'Yesno.wtf API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Can't make a decision`)
                        .setTimestamp()
                        .setFooter({ text: 'Yesno.wtf API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    DecisionCommand
};