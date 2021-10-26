module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			type: 'once',
			run: this.run
		};
	}
	async run () {

		console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green);
		setInterval(() => {
			if (global.gc) {
				global.gc();
			}
			const ram = process.memoryUsage().rss / 1024 / 1024;
			console.log(`[RAM] ${ram.toFixed(2)}mb`.cyan);
			global.zuly.users.map(g => global.zuly.users.delete(g.id));
		}, 3000);
		const {
			version
		} = require('../../package.json');
		const adg = await global.zuly.getRESTUser('726449359167684734');
		const status = [`zulybot.xyz | ${global.zuly.user.username} [v${version}]`, `I'm on ${global.zuly.guilds.size} servers | ${global.zuly.user.username} [v${version}]`, `Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v${version}]`, `z!help | ${global.zuly.user.username} [v${version}]`, `z!upvote | ${global.zuly.user.username} [v${version}]`, `z!invite | ${global.zuly.user.username} [v${version}]`, `Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v${version}]`, `I was created by: ${adg.username}#${adg.discriminator}`];
		const presence = ['online', 'idle', 'dnd'];
		setInterval(async () => {
			const backupchannel = await global.zuly.getRESTChannel('900812224610856971');
			const {
				readFile
			} = require('fs');
			const util = require('util');
			const read = util.promisify(readFile);
			const moment = require('moment');

			backupchannel.createMessage(`<:zu_host:885220885101940796> Backup do banco de dados (principal)! | ${moment().format('DD/MM/YYYY | h:mm:ss')}`, {
				file: await read('./data/base.json'),
				name: 'base.json'
			});
			global.zuly.editStatus(presence[Math.floor(Math.random() * presence.length)], {
				game: global.zuly.user.username,
				name: status[Math.floor(Math.random() * status.length)],
				type: 5
			});
		}, 1000 * 180);
		global.zuly.music.init(global.zuly.user.id);
		const ch = await global.zuly.getRESTChannel('895018321827733564');
		const CronJob = require('cron').CronJob;
		const job = new CronJob('00 15 21 * * *', function() {
			ch.createMessage('<a:zu_fortnite:894977940926910485> Loja diária atualizada **|** https://fn.zulybot.xyz/shop-now.png');
		}, null, !0, 'America/Sao_Paulo');
		job.start();
	}
};