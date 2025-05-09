import 'reflect-metadata';
import 'dotenv/config';

import { env, envNumber } from './utils/env';
import { app } from './app';

(() => {
  const port = envNumber({ key: 'PORT' });
  const host = env({ key: 'HOST' });

  app.listen({ port, host }, error => {
    if (error) {
      console.error('Erro fatal!', error);
      process.exit(1);
    }
    console.error(`Server is running on port ${port}`);
  });
})();
