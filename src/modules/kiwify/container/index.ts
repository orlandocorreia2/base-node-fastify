import { container } from 'tsyringe';
import { CreateLogUseCase } from '../../../shared/usecases/create.log.usecase';
import { CreateLogUseCaseInterface } from '../../../shared/usecases/interfaces/create.log.use.case.interface';
import { LogRepositoryInterface } from '../../../shared/repositories/interfaces/log.repository.interface';
import { LogRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/log.repository.prisma';
import { AddKiwifySubscriptionUseCaseInterface } from '../usecases/interfaces/add.kiwify.subscription.usecase.interface';
import { AddKiwifySubscriptionUseCase } from '../usecases/add.kiwify.subscription.usecase';
import { FindOneUserUseCaseInterface } from '../../../modules/users/usecases/interfaces/find.one.user.use.case.interface';
import { FindOneUserUseCase } from '../../../modules/users/usecases/find.one.user.usecase';
import { CreateUserUseCaseInterface } from '../../../modules/users/usecases/interfaces/create.user.use.case.interface';
import { CreateUserUseCase } from '../../../modules/users/usecases/create.user.usecase';
import { UpdateUserUseCaseInterface } from '../../../modules/users/usecases/interfaces/update.user.use.case.interface';
import { UpdateUserUseCase } from '../../../modules/users/usecases/update.user.usecase';
import { MailInterface } from '../../../shared/email/mail.interface';
import { DuplicatedSubscribeMailResend } from '../../../infra/mail/resend/duplicated.subscribe.mail.resend';
import { RenewalUserMailResend } from '../../../infra/mail/resend/renewal.user.mail.resend';

container.registerSingleton<AddKiwifySubscriptionUseCaseInterface>(
  'AddKiwifySubscriptionUseCase',
  AddKiwifySubscriptionUseCase,
);

container.registerSingleton<CreateLogUseCaseInterface>(
  'CreateLogUseCase',
  CreateLogUseCase,
);

container.registerSingleton<FindOneUserUseCaseInterface>(
  'FindOneUserUseCase',
  FindOneUserUseCase,
);

container.registerSingleton<CreateUserUseCaseInterface>(
  'CreateUserUseCase',
  CreateUserUseCase,
);

container.registerSingleton<UpdateUserUseCaseInterface>(
  'UpdateUserUseCase',
  UpdateUserUseCase,
);

container.registerSingleton<LogRepositoryInterface>(
  'LogRepository',
  LogRepositoryPrisma,
);

container.registerSingleton<MailInterface>(
  'DuplicatedSubscribeMail',
  DuplicatedSubscribeMailResend,
);

container.registerSingleton<MailInterface>(
  'RenewalUserMail',
  RenewalUserMailResend,
);
