import { auctionPropertyRoutesModule } from '../modules/auction.properties/routes';
import { permissionGroupRoutesModule } from '../modules/permision.groups/routes';
import { sessionRoutesModule } from '../modules/sessions/routes';
import { userRoutesModule } from '../modules/users/routes';
import { kiwifyRoutesModule } from '../modules/kiwify/routes';
import { FastifyTypedInstance } from '../types/types';
import { version } from '../../package.json';

export const appRoutes = (app: FastifyTypedInstance) => {
  userRoutesModule(app);
  sessionRoutesModule(app);
  permissionGroupRoutesModule(app);
  auctionPropertyRoutesModule(app);
  kiwifyRoutesModule(app);

  app.get('/health', () => ({
    status: 'Healthy',
    uptime: process.uptime(),
    name: 'Jarvis',
    version,
    message: 'Jarvis Api is up!',
    timestamp: new Date(),
  }));
};
