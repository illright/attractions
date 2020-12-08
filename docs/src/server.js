import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, SAPPER_APP_BASEPATH } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    SAPPER_APP_BASEPATH || '/',
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) {
      console.error(err);
    }
  });
