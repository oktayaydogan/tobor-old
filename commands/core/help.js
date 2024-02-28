const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "help",
	description: "All the commands this bot has!",
	showHelp: false,

	execute({ client, inter }) {
		const commands = client.commands.filter((x) => x.showHelp !== false);

		const embed = new EmbedBuilder()
			.setColor("#ff0000")
			.setAuthor({
				name: client.user.username,
				iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
			})
			.setDescription("Here are all the commands available on this bot! 📜")
			.addFields([
				{
					name: `Enabled - ${commands.size}`,
					value: commands.map((x) => `\`${x.name}\``).join(" | "),
				},
			])
			.setTimestamp();

		inter.editReply({ embeds: [embed] });
	},
};
