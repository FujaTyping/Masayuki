const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class AskCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('ask').setDescription('How can i help you?')
                .addStringOption((option) => // Add option
                    option
                        .setName('prompt')
                        .setDescription('Enter want do to want to ask me!')
                        .setRequired(true)
                )
                .addStringOption((option) => // Add option
                    option
                        .setName('type')
                        .setDescription('Type of answer that you want!')
                        .addChoices(
                            { name: 'Long', value: 'long' },
                            { name: 'Short', value: 'short' },
                            { name: 'Programming', value: 'programming' }
                        )
                )
        );
    }

    async chatInputRun(interaction) {

        const Prompt = interaction.options.getString('prompt')
        const Type = interaction.options.getString('type') ?? 'normal'
        const Author = interaction.user.username
        const DefultPrompt = `${Author} : ${Prompt}\nMasayuki : \n(Use general conversational language without being very informal, Answer question only in ${Type})`;

        const Warn = new EmbedBuilder()
            .setColor(14425658)
            .setTitle("💥 Feature unavailable")
            .setDescription(`⚠ Sorry ` + `${Author}` + ", Masayuki `/ask` feature is unavailable right now!\nWe're fixing the error : Could not get Google Bard")
            .setTimestamp()
            .setFooter({ text: 'Bard Ai', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1133795819208851518/Google_Bard_logo-svg.png' });

        const msg = await interaction.reply({ embeds: [Warn], fetchReply: true });

    }
}

module.exports = {
    AskCommand
};