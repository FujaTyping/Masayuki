const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js')

class AboutCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('about').setDescription('About Me Masayuki')
        );
    }

    async chatInputRun(interaction) {

        const Img = new EmbedBuilder()
            .setColor(14425658)
            .setImage('https://cdn.discordapp.com/attachments/1071401485239332864/1125144257875951646/ImgCreator.ai_Anime_boy_adult_with_red_hair_wearing_a_white_shirt_with_red_jacket_red_pants_13.png')

        const Content = new EmbedBuilder()
            .setColor(14425658)
            .setTitle('🧩  About Me Masayuki')
            .setDescription('I am Masayuki, an 18-year-old student at Akane High School. Standing at 175 cm, I have a calm and composed demeanor. My best friend is Maoyumi, who possesses a fiery and passionate spirit. Together, we navigate the challenges of adolescence and embark on a journey of self-discovery, cherishing the moments we share at Akane High School.')
            .setTimestamp()

        return await interaction.reply({ embeds: [Img, Content] });
    }
}

module.exports = {
    AboutCommand
};