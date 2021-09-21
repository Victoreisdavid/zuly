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
				categoria: '💖 » Waifu',
				desc: 'Vê informação de waifu'
			},
			en: {
				nome: 'profile',
				categoria: '💖 » Waifu',
				desc: 'See waifu info.'
			},
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
		  const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]) : ctx.message.author;
		  const back = await global.db.get(`background-${user.id}`) || './assets/backgrounds/default.jpg';

		  registerFont('./assets/fonts/Dunkin.otf', {
			family: 'Dunkin'
		  });

		  const background = await loadImage('./assets/profile/profile.png');
		  const developer = await global.db.get(`dev-${user.id}`);

		  const back2 = await loadImage(back);
		  const avatar = await loadImage(user.avatarURL);

		  const canvas = createCanvas(background.width, background.height);
		  const foto = canvas.getContext('2d');

		  const about = await global.db.get(`about-${user.id}`) || ctx.idioma.perfil.desc.replace('%p', ctx.prefix);

		  foto.drawImage(back2, 0, 0, canvas.width, canvas.height);
		  foto.drawImage(avatar, 75, 10, 160, 160);
		  foto.drawImage(background, 0, 0, canvas.width, canvas.height);

		  if (developer) {
			const botdev = await loadImage('./assets/badges/botdev.png');
			foto.drawImage(botdev, 650, 60, 50, 45);
		  }

		  if (user.username.length > 9) {
			foto.font = '17px Dunkin';
		  }
		  if (user.username.length < 9) {
			foto.font = '30px Dunkin';
		  }
		  foto.fillStyle = '#ffffff';
		  foto.fillText(`${user.username.toUpperCase()}#${user.discriminator}`, canvas.width / 2.5, canvas.height / 6.5);

		  foto.font = '17px Dunkin';
		  foto.fillText(about.match(/.{1,65}/g).join('\n'), canvas.width / 28, canvas.height / 1.17);
		  ctx.message.channel.createMessage(ctx.message.author.mention, {
			file: canvas.toBuffer(),
			name: 'profile.png'
		  });
	}
};
