import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    `<b>Дай боже!</b>\nЯ допоможу тобі зорієнтуватись у вартості автотранспорту\nПросто вкажи параметри які тебе цікавлять і я вирахую середню вартість по обявах що зараз продаюьться на Auto.Ria`,
  ),
);

export default bot;
