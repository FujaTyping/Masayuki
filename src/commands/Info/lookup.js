const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js')

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

        return await interaction.reply({ embeds: [Content] });
    }
}

module.exports = {
    DiscordCommand
};