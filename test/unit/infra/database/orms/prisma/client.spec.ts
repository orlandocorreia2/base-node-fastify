import { PrismaClient } from '@prisma/client';

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $transaction: jest.fn(),
    $queryRaw: jest.fn(),
    $executeRaw: jest.fn(),
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    log: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    permissionGroup: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    token: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe('Prisma Client', () => {
  let mockPrismaClient: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Import the module after mocking
    delete require.cache[
      require.resolve('../../../../../../src/infra/database/orms/prisma/client')
    ];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should export a PrismaClient instance', () => {
    const clientModule = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(clientModule.prisma).toBeDefined();
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });

  it('should create a singleton PrismaClient instance', () => {
    const clientModule1 = require('../../../../../../src/infra/database/orms/prisma/client');
    const clientModule2 = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(clientModule1.prisma).toBe(clientModule2.prisma);
  });

  it('should have prisma instance with expected methods', () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(prisma).toHaveProperty('$connect');
    expect(prisma).toHaveProperty('$disconnect');
    expect(prisma).toHaveProperty('$transaction');
    expect(prisma).toHaveProperty('$queryRaw');
    expect(prisma).toHaveProperty('$executeRaw');
  });

  it('should have prisma instance with expected models', () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(prisma).toHaveProperty('user');
    expect(prisma).toHaveProperty('log');
    expect(prisma).toHaveProperty('permissionGroup');
    expect(prisma).toHaveProperty('token');
  });

  it('should have user model with CRUD operations', () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(prisma.user).toHaveProperty('findMany');
    expect(prisma.user).toHaveProperty('findUnique');
    expect(prisma.user).toHaveProperty('create');
    expect(prisma.user).toHaveProperty('update');
    expect(prisma.user).toHaveProperty('delete');
  });

  it('should have log model with expected operations', () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(prisma.log).toHaveProperty('findMany');
    expect(prisma.log).toHaveProperty('create');
  });

  it('should have permissionGroup model with read operations', () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(prisma.permissionGroup).toHaveProperty('findMany');
    expect(prisma.permissionGroup).toHaveProperty('findUnique');
  });

  it('should have token model with expected operations', () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    expect(prisma.token).toHaveProperty('create');
    expect(prisma.token).toHaveProperty('findUnique');
    expect(prisma.token).toHaveProperty('delete');
  });

  it('should be able to mock database operations', async () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    // Mock a database operation
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await prisma.user.findUnique({ where: { id: '1' } });

    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should be able to mock connection methods', async () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    prisma.$connect.mockResolvedValue(undefined);
    prisma.$disconnect.mockResolvedValue(undefined);

    await prisma.$connect();
    await prisma.$disconnect();

    expect(prisma.$connect).toHaveBeenCalledTimes(1);
    expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
  });

  it('should be able to mock transaction operations', async () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    const mockTransactionResult = { success: true };
    prisma.$transaction.mockResolvedValue(mockTransactionResult);

    const transactionCallback = jest.fn();
    const result = await prisma.$transaction(transactionCallback);

    expect(result).toEqual(mockTransactionResult);
    expect(prisma.$transaction).toHaveBeenCalledWith(transactionCallback);
  });

  it('should be able to mock raw query operations', async () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    const mockQueryResult = [{ count: 5 }];
    prisma.$queryRaw.mockResolvedValue(mockQueryResult);

    const result = await prisma.$queryRaw`SELECT COUNT(*) as count FROM users`;

    expect(result).toEqual(mockQueryResult);
    expect(prisma.$queryRaw).toHaveBeenCalled();
  });

  it('should be able to mock execute raw operations', async () => {
    const {
      prisma,
    } = require('../../../../../../src/infra/database/orms/prisma/client');

    const mockExecuteResult = { affectedRows: 1 };
    prisma.$executeRaw.mockResolvedValue(mockExecuteResult);

    const result =
      await prisma.$executeRaw`UPDATE users SET updated_at = NOW() WHERE id = '1'`;

    expect(result).toEqual(mockExecuteResult);
    expect(prisma.$executeRaw).toHaveBeenCalled();
  });
});
