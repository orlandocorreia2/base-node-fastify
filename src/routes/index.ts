import { auctionPropertyRoutesModule } from '../modules/auction.properties/routes';
import { permissionGroupRoutesModule } from '../modules/permision.groups/routes';
import { sessionRoutesModule } from '../modules/sessions/routes';
import { userRoutesModule } from '../modules/users/routes';
import { FastifyTypedInstance } from '../types/types';
import { version } from '../../package.json';

export const appRoutes = (app: FastifyTypedInstance) => {
  userRoutesModule(app);
  sessionRoutesModule(app);
  permissionGroupRoutesModule(app);
  auctionPropertyRoutesModule(app);

  app.get('/health', () => ({
    status: 'Healthy',
    uptime: process.uptime(),
    name: 'Jarvis',
    version,
    message: 'Jarvis Api is up!',
    timestamp: new Date(),
  }));

  app.post('/webhook/kiwify', (req, res) => {
    console.log('Kiwify endpoint hit', { req });
    res.status(200).send({
      message: 'Ok',
      req,
    });
  });
};
