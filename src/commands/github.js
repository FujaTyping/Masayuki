const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder, User } = require('discord.js')
const axios = require('axios')

class GithubCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('github').setDescription('Who are you?')
                .addStringOption((option) => // Add option
                    option
                        .setName('username')
                        .setDescription('Enter your github username')
                        .setRequired(true)
                )
        );
    }

    async chatInputRun(interaction) {

        const Username = interaction.options.getString('username')

        const Wait = new EmbedBuilder()
            .setColor(14425658)
            .setTitle(`🔎 Looking for username : ${Username}`)
            .setTimestamp()
            .setFooter({ text: 'Github API', iconURL: 'https://cdn.discordapp.com/attachments/988037995531759658/1127243614536343642/Black-Github-Logo-PNG-Image-Background_1.png' });

        const msg = await interaction.reply({ embeds: [Wait], fetchReply: true });

        if (isMessageInstance(msg)) {
            axios.get(`https://api.github.com/users/${Username}`)
                .then(response => {
                    const user = response.data;

                    const Content = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`Result for username : ${user.login} ✨`)
                        .setThumbnail(`${user.avatar_url}`)
                        .setDescription(`- 👤 Name : ${user.name}\n- 🆔 Id : ${user.id}\n- 🌎 Location : ${user.location}\n- 🔗 Profile url : ${user.html_url}`)
                        .addFields(
                            { name: '🌐 Public repository', value: `${user.public_repos}`, inline: true },
                            { name: '🌐 Public gist', value: `${user.public_gists}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Github API', iconURL: 'https://cdn.discordapp.com/attachments/988037995531759658/1127243614536343642/Black-Github-Logo-PNG-Image-Background_1.png' });

                    return interaction.editReply({ embeds: [Content] });
                })
                .catch(error => {
                    const Error = new EmbedBuilder()
                        .setColor(14425658)
                        .setTitle(`❌ Cannot find username : ${Username}`)
                        .setTimestamp()
                        .setFooter({ text: 'Github API', iconURL: 'https://cdn.discordapp.com/attachments/988037995531759658/1127243614536343642/Black-Github-Logo-PNG-Image-Background_1.png' });

                    return interaction.editReply({ embeds: [Error] });
                });
        }

    }
}

module.exports = {
    GithubCommand
};