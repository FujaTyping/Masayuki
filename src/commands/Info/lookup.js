const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

class DiscordCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('discord').setDescription('Snowflake?')
                .addUserOption((option) => // Add option
                    option
                        .setName('user')
                        .setDescription('Enter user want to lookup')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const Server = interaction.guild
        const User = interaction.options.getUser('user')
        const Member = Server.members.cache.get(User.id);
        const Permissions = Member.permissions.toArray();
        const PermissionsString = Permissions.join(' , ');

        const Request = new ButtonBuilder() // Button builder
            .setCustomId('request')
            .setLabel('Request permissions')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔐');

        const Trigged = new ActionRowBuilder() // Build components
            .addComponents(Request);

        const Content = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`👤 Lookup for ${User.username}`)
            .setDescription(`- 🖋 Nickname : ${Member.nickname}\n- 📃 Server : ${Server.name}\n- 🌎 Locale : ${Server.preferredLocale}\n- 🧩 Discriminator : #${User.discriminator}\n- 🆔 Id : ${User.id}\n- 🤖 Bot : ${User.bot}\n- 🔧 System : ${User.system}\n- 🔨 Created at : ${User.createdAt.toLocaleString()}`)
            .addFields(
                { name: 'ฺ🖼 Banner', value: `${User.banner}`, inline: true },
                { name: '🎨 Accent color', value: `${User.accentColor}`, inline: true },
                //{ name: '🔐 Permissions', value: `${PermissionsString}` },
            )
            .setThumbnail(`${User.avatarURL()}`)
            .setTimestamp()

        await interaction.reply({ embeds: [Content], components: [Trigged] });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (buttonInteraction) => buttonInteraction.customId === 'request' && buttonInteraction.user.id === interaction.user.id,
            time: 60000,
            max: 1
        });

        collector.on('collect', async (buttonInteraction) => {
            await buttonInteraction.deferUpdate();

            const Content = new EmbedBuilder()
                .setColor(14425658)
                .setTitle(`👤 Lookup for ${User.username}`)
                .setDescription(`- 🖋 Nickname : ${Member.nickname}\n- 📃 Server : ${Server.name}\n- 🌎 Locale : ${Server.preferredLocale}\n- 🧩 Discriminator : #${User.discriminator}\n- 🆔 Id : ${User.id}\n- 🤖 Bot : ${User.bot}\n- 🔧 System : ${User.system}\n- 🔨 Created at : ${User.createdAt.toLocaleString()}`)
                .addFields(
                    { name: 'ฺ🖼 Banner', value: `${User.banner}`, inline: true },
                    { name: '🎨 Accent color', value: `${User.accentColor}`, inline: true },
                    { name: '🔐 Permissions', value: `${PermissionsString}` },
                )
                .setThumbnail(`${User.avatarURL()}`)
                .setTimestamp()

            return interaction.editReply({ embeds: [Content], components: [] })
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                return interaction.editReply({ embeds: [Content], components: [] });
            }
        });
    }
}

module.exports = {
    DiscordCommand
};