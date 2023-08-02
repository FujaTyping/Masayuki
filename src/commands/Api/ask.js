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
        const DefultPrompt = `Your name is : Masayuki and talking with : ${Author}\nAnd ${Author} ask you (Answer question in ${Type}) : `;

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🗨️ Thinking the answer`)
            .setDescription(`- This will take a several minutes...\nIf take too long, please check bot response time`)
            .setTimestamp()
            .setFooter({ text: 'Bard Ai', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1133795819208851518/Google_Bard_logo-svg.png' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            async function Main() {
                const Bard = await import("bard-ai");
                const Auth = process.env.bard_authorization;
                const Initz = await Bard.init(Auth);
                const Response = await Bard.askAI(DefultPrompt + Prompt);

                const Content = new EmbedBuilder()
                    .setColor(14425658)
                    .setTitle(`🔮 Response for ${Author}`)
                    .setDescription(Response)
                    .setTimestamp()
                    .setFooter({ text: 'Bard Ai', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1133795819208851518/Google_Bard_logo-svg.png' });

                return interaction.editReply({ embeds: [Content] });
            }

            try {
                Main();
            } catch (e) {
                const Error = new EmbedBuilder()
                    .setColor(14425658)
                    .setTitle(`❌ Cannot answer your question`)
                    .setTimestamp()
                    .setFooter({ text: 'Bard Ai', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1133795819208851518/Google_Bard_logo-svg.png' });

                return interaction.editReply({ embeds: [Error] });
            }
        }
    }
}

module.exports = {
    AskCommand
};