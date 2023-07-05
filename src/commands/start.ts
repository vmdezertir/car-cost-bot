import { BaseCommand } from './baseCommand';
import { Telegraf, Markup } from 'telegraf';
import { IBotContext } from '../context';
import { EComands } from './types';

export class StartCommand extends BaseCommand {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply('', Markup.keyboard([Markup.button.callback('Гараж', EComands.SEE_GARAGE)]));
      ctx.replyWithHTML(
        `<b>Дай боже!</b>\nЯ допоможу тобі зорієнтуватись у вартості автотранспорту\nПросто вкажи параметри які тебе цікавлять і я вирахую середню вартість по об'явах що зараз продаються на Auto.Ria`,
        Markup.inlineKeyboard([Markup.button.callback('Вказати автотранспорт', EComands.ADD_TRANSPORT)]),
      );
    });

    this.bot.action(EComands.ADD_TRANSPORT, (ctx) => {
      ctx.editMessageText('Вибери тип автотранспортy');
    });
  }
}
