const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const os = require('os');

class PerformanceCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('performance').setDescription('How are you?')
        );
    }

    async chatInputRun(interaction) {

        const Request = new ButtonBuilder() // Button builder
            .setCustomId('request')
            .setLabel('View status')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('📈');

        const Trigged = new ActionRowBuilder() // Build components
            .addComponents(Request);

        const cpu = os.cpus();

        const Content = new EmbedBuilder()
            .setColor(14425658)
            .setTitle("I'm fine 👍🏻 , Thank you")
            .setDescription(`- 👦🏻 Name : Masayuki\n- 📃 Version : 1.0.0\n- ⌚ Uptime (in seconds) : ${os.uptime()}`)
            .addFields(
                { name: '🏠 Host name', value: `${os.hostname()}` },
                { name: '🖥 Cpu', value: `${cpu[0].model}` },
                { name: '🖥 Cpu (core)', value: `${cpu.length}`, inline: true },
                { name: '💾 Total ram (in bytes)', value: `${os.totalmem()}`, inline: true },
                { name: '💾 Free ram (in bytes)', value: `${os.freemem()}`, inline: true },
                { name: '🐧 Architecture', value: `${os.arch()}`, inline: true },
                { name: '🌍 Platform', value: `${os.platform()}`, inline: true },
                { name: '🔑 Type', value: `${os.type()}`, inline: true },
            )
            .setTimestamp()

        await interaction.reply({ embeds: [Content], components: [Trigged] });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (buttonInteraction) => buttonInteraction.customId === 'request' && buttonInteraction.user.id === interaction.user.id,
            time: 60000,
            max: 1
        });

        collector.on('collect', async (buttonInteraction) => {
            await buttonInteraction.deferUpdate();
            const Start = "```"
            const Server = this.container.client.guilds.cache.size
            const Shard = this.container.client.options.shardCount

            const Button_Content = new EmbedBuilder()
                .setColor(14425658)
                .setTitle(`📊 This is my status`)
                .setDescription(`- Here is my realtime general information\n` + Start + `\n🏡 Server : ` + Server + ` | 💎 Shard : ` + Shard + `\n` + Start)
                .setTimestamp()

            return interaction.editReply({ embeds: [Content, Button_Content], components: [] })
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                return interaction.editReply({ embeds: [Content], components: [] });
            }
        });
    }
}

module.exports = {
    PerformanceCommand
};