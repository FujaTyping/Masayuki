const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class EmoteCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('emote').setDescription('Sent emote to your friend!')
                .addStringOption((option) => // Add option
                    option
                        .setName('action')
                        .setDescription('Choose action for emote!')
                        .addChoices(
                            { name: 'Hug', value: 'hug' },
                            { name: 'Kiss', value: 'kiss' },
                            { name: 'Bonk', value: 'bonk' },
                            { name: 'Yeet', value: 'yeet' },
                            { name: 'Wave', value: 'wave' },
                            { name: 'Highfive', value: 'highfive' },
                            { name: 'Handhold', value: 'handhold' },
                            { name: 'Slap', value: 'slap' },
                            { name: 'Kill', value: 'kill' },
                            { name: 'Kick', value: 'kick' },
                            { name: 'Bite', value: 'bite' }
                        )
                        .setRequired(true)
                )
                .addUserOption((option) => // Add option
                    option
                        .setName('user')
                        .setDescription('Enter user want to sent emote')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const Action = interaction.options.getString('action')
        const User = interaction.options.getUser('user')

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🤩 Choosing best emote for you`)
            .setTimestamp()
            .setFooter({ text: 'Waifu.pics API' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://api.waifu.pics/sfw/${Action}`)
                .then(response => {
                    const info = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Showing the emote 🥰`)
                        .setDescription(`<@${interaction.user.id}> ${Action} to ${User}`)
                        .setImage(`${info.url}`)
                        .setTimestamp()
                        .setFooter({ text: 'Waifu.pics API' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find best emote for you`)
                        .setTimestamp()
                        .setFooter({ text: 'Waifu.pics API' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    EmoteCommand
};