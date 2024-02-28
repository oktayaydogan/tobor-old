module.exports = {
	app: {
		token:
			"NTM5OTQ4MjExNjYyNDg3NTYz.GbCZ5P.sHdv1bb9FLvw94u9DVWaGO59xAjTwVPbsdCvMc",
		playing: "by Tobor ❤️",
		global: true,
		client: "539948211662487563",
		guild: "671811926262808582",
		ExtraMessages: false,
		loopMessage: false,
	},

	opt: {
		DJ: {
			enabled: false,
			roleName: "",
			commands: [],
		},
		maxVol: 100,
		spotifyBridge: true,
		volume: 75,
		leaveOnEmpty: true,
		leaveOnEmptyCooldown: 30000,
		leaveOnEnd: true,
		leaveOnEndCooldown: 30000,
		discordPlayer: {
			ytdlOptions: {
				quality: "highestaudio",
				highWaterMark: 1 << 25,
			},
		},
	},
};
