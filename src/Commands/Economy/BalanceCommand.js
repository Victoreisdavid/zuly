module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'balance',
				categoria: '💰 » Economia',
				desc: 'Pegue seu dinheiro diário.'
			},
			en: {
				nome: 'balance',
				categoria: '💰 » Economy',
				desc: 'take your daily money.'
			},
			/*
			SUB_COMMAND	1 = SubCommand
			SUB_COMMAND_GROUP: 2 = SubCommandGroup
			STRING: 3 = String
			INTEGER: 4 = Any integer between -2^53 and 2^53
			BOOLEAN: 5 = True or False
			USER: 6 = User Mention
			CHANNEL: 7 = Includes all channel types + categories
			ROLE: 8 = Role Mention
			MENTIONABLE: 9 = Includes users and roles
			NUMBER: 10 = Any double between -2^53 and 2^53
			*/
			options: [],
			aliases: ['bal', 'money'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]) : ctx.message.author;
		const ryos = await global.db.get(`ryos-${ctx.message.author.id}`) || 0;

		const embed = new ctx.embed();
		embed.title(`💰 Balance | ${global.zuly.user.username}`);
		embed.field(`<:zu_anime:882668160480849970> Ryos: __${user.username}#${user.discriminator}__`, `${ryos}`);
		embed.color('#ffcbdb');
		embed.thumbnail(global.zuly.user.avatarURL);
		embed.footer('⤷ https://zulybot.xyz');
		ctx.send(embed.create);
	}
};