import { Telegraf } from 'telegraf';
import { IBotContext } from '../context';

export abstract class BaseCommand {
  constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
