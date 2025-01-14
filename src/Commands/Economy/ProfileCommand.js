/* eslint-disable new-cap */
module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'profile',
				categoria: '💰 » Economia',
				desc: 'Vê o seu perfil na economia.'
			},
			en: {
				nome: 'profile',
				categoria: '💰 » Economy',
				desc: 'See your profile in the economy.'
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
			aliases: ['perfil', 'status'],
			run: this.run
		};
	}

	async run (ctx) {
		const {
			createCanvas,
			loadImage,
			registerFont
		  } = require('canvas');
		  const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
		  const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]).catch(() => ctx.message.author) : ctx.message.author;
		  const back = await global.db.get(`background-${user.id}`) || './assets/images/backgrounds/default.jpg';
		  registerFont('./assets/fonts/Dunkin.otf', {
			family: 'Dunkin'
		  });
		  const background = await loadImage('./assets/images/profile/profile.png');
		  const back2 = await loadImage(back);
		  const avatar = await loadImage(user.avatarURL);
		  const canvas = createCanvas(background.width, background.height);
		  const foto = canvas.getContext('2d');
		  const about = await global.db.get(`about-${user.id}`) || ctx.idioma.perfil.desc.replace('%p', ctx.prefix);
		  foto.drawImage(back2, 0, 0, canvas.width, canvas.height);
		  foto.drawImage(avatar, 75, 10, 160, 160);
		  foto.drawImage(background, 0, 0, canvas.width, canvas.height);

		  const userPremium = await global.zuly.getPremium('doador', user.id);
		  const bugHunter = await global.zuly.getBugHunter(user.id);

		  if (bugHunter && userPremium) {
			const bug = await loadImage('./assets/images/badges/bughunter.png');
			const early = await loadImage('./assets/images/badges/earlysupport.png');
			foto.drawImage(early, 650, 60, 60, 45);
			foto.drawImage(bug, 700, 60, 60, 45);
		  }
		else if (bugHunter) {
			const early = await loadImage('./assets/images/badges/bughunter.png');
			foto.drawImage(early, 650, 60, 60, 45);
		  }
		else if (userPremium) {
			const early = await loadImage('./assets/images/badges/earlysupport.png');
			foto.drawImage(early, 650, 60, 60, 45);
		  }

		  if (user.username.length > 9) {
			foto.font = '17px Dunkin';
		  }
		  if (user.username.length < 9) {
			foto.font = '30px Dunkin';
		  }
		  foto.fillStyle = '#ffffff';
		  await fillTextWithTwemoji(foto, `${user.username.toUpperCase()}#${user.discriminator}`, canvas.width / 2.5, canvas.height / 6.5);
		  foto.font = '17px Dunkin';
		  await fillTextWithTwemoji(foto, about.match(/.{1,65}/g).join('\n'), canvas.width / 28, canvas.height / 1.17);
		  ctx.message.channel.slashReply(ctx.message.author.mention, {
			file: canvas.toBuffer(),
			name: 'profile.png'
		  });
	}
};
