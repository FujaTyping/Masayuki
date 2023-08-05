const { Command } = require('@sapphire/framework');
const { AutoPoster } = require("topgg-autoposter");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

class TopggCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'topgg',
            aliases: ['tg'],
            description: 'post status to top.gg',
            preconditions: ['OwnerOnly']
        });
    }

    async messageRun(message) {

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`⚙️ Posting status to top.gg`)
            .setDescription(`- This will take a several minutes...\nIf take too long, please check top.gg web status`)
            .setTimestamp()
            .setFooter({ text: 'Top.gg SDK', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1137312775463522384/Google_Bard_logo-svg.png' });

        const msg = await message.channel.send({ embeds: [Wait] });

        const View = new ButtonBuilder() // Button builder
            .setLabel('View')
            .setURL('https://top.gg/bot/1124700960191676446')
            .setStyle(ButtonStyle.Link);

        const Trigged = new ActionRowBuilder() // Build components
            .addComponents(View);

        AutoPoster(process.env.topgg_token, this.container.client).on("posted", () => {
            const Content = new EmbedBuilder()
                .setColor(14425658)
                .setTitle(`Posted to top.gg ✅`)
                .setDescription(`You can check bot status on top.gg website\nIt's will take 10-20 minute to update status on website`)
                .setTimestamp()
                .setFooter({ text: 'Top.gg SDK', iconURL: 'https://cdn.discordapp.com/attachments/1071401485239332864/1137312775463522384/Google_Bard_logo-svg.png' });

            return msg.edit({ embeds: [Content], components: [Trigged] });
        });

    }
}

module.exports = {
    TopggCommand
};