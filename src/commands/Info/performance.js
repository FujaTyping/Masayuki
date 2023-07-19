const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js')
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

        return interaction.reply({ embeds: [Content] });
    }
}

module.exports = {
    PerformanceCommand
};