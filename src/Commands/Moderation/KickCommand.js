module.exports = class KickCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['kickMembers'],
				bot: ['kickMembers'],
				dono: false
			},
			pt: {
				nome: 'kick',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Bane algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'kick',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Bane algum usuário babaca de seu servidor'
			},
			aliases: ['expulsar', 'hackkick', 'forcekick', 'kickar'],
			run: this.run
		};
	}

	async run (ctx) {
		let member;
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`);

		if (!ctx.message.mentions[0]) {
			member = await global.zuly.getRESTUser(ctx.args[0]);
		}
		else {
			member = await ctx.message.mentions[0];
		}
		let banReason;
		if (ctx.args[1]) {
			banReason = ctx.args.slice(1).join(' ');
		}
		else {
			banReason = ctx.idioma.ban.mot;
		}
		ctx.message.channel.guild.kickMember(member.id, `${ctx.idioma.ban.mot2} ${ctx.message.author.tag} - ${ctx.idioma.ban.mot3} ${banReason}`);
	}
};

// ADG, Davi e LRD
