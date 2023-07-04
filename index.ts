const fastify = require('fastify');

import bot from 'src/bot';

const app = fastify();

const { PORT, WEBHOOK_DOMAIN, MONGO_DB } = process.env;

const schema = {
  type: 'object',
  required: ['PORT', 'BOT_TOKEN', 'WEBHOOK_DOMAIN', 'MONGO_DB'],
  properties: {
    PORT: {
      type: 'string',
      default: '8080',
    },
    BOT_TOKEN: {
      type: 'string',
    },
    WEBHOOK_DOMAIN: {
      type: 'string',
      default: 'http://127.0.0.1:8080',
    },
    MONGO_DB: {
      type: 'string',
    },
  },
};
const options = {
  dotenv: true,
  schema: schema,
};

// Plugins
app.register(require('@fastify/env'), options);
app.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  url: MONGO_DB,
});

// Set bot hook
const webhook = await bot.createWebhook({ domain: WEBHOOK_DOMAIN });

app.post(bot.secretPathComponent(), (req, rep) => webhook(req.raw, rep.raw));

app.listen({ port: +PORT }).then(() => console.log('Listening on port', PORT));
