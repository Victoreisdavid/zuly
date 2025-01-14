module.exports = class PrintCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'print',
				categoria: '🕰️ » Utilidades',
				desc: 'Tira print de algum website.'
			},
			en: {
				nome: 'print',
				categoria: '🕰️ » Utility',
				desc: 'Take a print from a website.'
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
			options: [
				{
					type: 3,
					name: 'website',
					description: 'The Website Link',
					required: true
				}
			],
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const embed = new ctx.embed();
		embed.setTitle(`📸 Print | ${global.zuly.user.username}`);
		embed.setDescription(`> <:zu_info:911303533859590144> ${ctx.args[0]}`);
		embed.setColor('#ffcbdb');
		embed.setImage(`https://image.thum.io/get/maxAge/12/width/700/crop/900/${encodeURIComponent(ctx.args[0])}`);
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()],
			flags: ctx.ephemeral
		});
	}
};
