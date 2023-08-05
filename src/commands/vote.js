const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

class VoteCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('vote').setDescription('Vote for me')
        );
    }

    async chatInputRun(interaction) {

        const Vote = new ButtonBuilder() // Button builder
            .setLabel('Vote')
            .setURL('https://top.gg/bot/1124700960191676446')
            .setStyle(ButtonStyle.Link);

        const Trigged = new ActionRowBuilder() // Build components
            .addComponents(Vote);

        const Content = new EmbedBuilder()
            .setColor(14425658)
            .setTitle('🌟 Vote for Masayuki')
            .setDescription("If you're enjoying use Masayuki, please consider vote or review masayuki on top.gg\nYou will not be granted any benefits, just a thank you.\n\n**What is top.gg ?**\nTop.gg is a website that lists and ranks Discord bots. It allows users to discover, review, and add bots to their servers. Top.gg is a popular resource for Discord users who are looking for new bots to add to their servers.")
            .setTimestamp()

        return interaction.reply({ embeds: [Content], components: [Trigged] });
    }
}

module.exports = {
    VoteCommand
};