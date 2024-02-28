module.exports = async (client) => {
	console.log(`Logged to the client ${client.user.username}`);
	client.user.setActivity(client.config.app.playing);
};
