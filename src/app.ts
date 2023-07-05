import { session, Telegraf } from 'telegraf';
import { Mongo } from '@telegraf/session/mongodb';

import { ConfigService, IConfigService } from './config';
import { IBotContext } from './context';
import { BaseCommand } from './commands/baseCommand';
import { StartCommand } from './commands/start';

class Bot {
  bot: Telegraf<IBotContext>;
  commands: BaseCommand[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
    this.bot.use(
      session({
        store: Mongo({
          url: this.configService.get('MONGO_DB'),
          database: 'car-cost-bot',
        }),
      }),
    );
    this.commands = [new StartCommand(this.bot)];
  }

  init() {
    this.commands.forEach((command) => command.handle());
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
