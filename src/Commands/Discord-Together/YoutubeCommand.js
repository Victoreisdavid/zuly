module.exports = class YoutubeCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'youtube',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Assista youtube no discord'
			},
			en: {
				nome: 'youtube',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Watch youtube on discord'
			},
			aliases: ['youtubetogether', 'youtube-together'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.together.channel}`);
		global.zuly.discordTogether.createTogetherCode(ctx.message.member.voiceState.channelID, 'youtube').then(async invite => {
			return ctx.message.channel.createMessage(`🎥 ${ctx.message.author.mention} **|** ${ctx.idioma.together.done} ${invite.code} ${ctx.idioma.together.done2}`);
		});
	}
};

// ADG, Davi e LRD
