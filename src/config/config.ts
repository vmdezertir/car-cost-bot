import { IConfigService } from './interface';
import { DotenvParseOutput, config } from 'dotenv';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) {
      throw new Error("Couldn't find env file configuration");
    }
    if (!parsed) {
      throw new Error('Empty env file configuration');
    }

    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error(`"${key}" does not exist`);
    }

    return res;
  }
}
