import { prisma } from '../src/infra/database/orms/prisma/client';
import { PermissionGroupProps } from '../src/modules/permision.groups/DTOs/permission.group';
import { PermissionRuleProps } from '../src/modules/permision.groups/DTOs/permission.rule';
import { User } from '../src/modules/users/DTOs/user';
import { generateHash } from '../src/utils/hash';
import { dateFutureDays } from '../src/utils/date';

const seedPermissionRules = async () => {
  const permissionRules: PermissionRuleProps[] = [
    {
      id: '63b33f45-568a-4415-874f-b04a7bc39645',
      rule: 'createUser',
      type: 'user',
      description: 'Create user permission',
    },
    {
      id: 'e0721b89-de65-4c02-ac3f-db9ad29ddb40',
      rule: 'listUsers',
      type: 'user',
      description: 'List user permission',
    },
    {
      id: '2bb1c581-1738-483e-bf93-c46afd12f972',
      rule: 'editUser',
      type: 'user',
      description: 'Edit user permission',
    },
    {
      id: '4cc02098-e623-4690-a155-10982abc57fa',
      rule: 'deleteUser',
      type: 'user',
      description: 'Delete user permission',
    },
    {
      id: 'ea116c24-25cf-49c7-9d51-4bed93b7d86e',
      rule: 'createPermissionGroup',
      type: 'permissionGroup',
      description: 'Create permission group permission',
    },
    {
      id: '58184e5b-fc1e-4310-bf68-83b09f2b74ec',
      rule: 'listPermissionGroups',
      type: 'permissionGroup',
      description: 'List permission group permission',
    },
    {
      id: '7484b16c-1232-4deb-a846-cd5e16d22e02',
      rule: 'editPermissionGroup',
      type: 'permissionGroup',
      description: 'Edit permission group permission',
    },
    {
      id: '3ac8e22a-3c0d-446c-9566-51744b56f258',
      rule: 'deletePermissionGroup',
      type: 'permissionGroup',
      description: 'Delete permission group permission',
    },
  ];

  for (const permissionRule of permissionRules) {
    const hasPermission = await prisma.permissionRule.findFirst({
      where: { rule: permissionRule.rule },
    });
    if (!hasPermission) {
      await prisma.permissionRule.create({ data: permissionRule });
    }
  }
};

const seedPermissionGroups = async () => {
  const permissionGroups: PermissionGroupProps[] = [
    {
      id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      name: 'Administrador',
      description: 'Grupo com todas as permissões',
    },
  ];
  for (const permissionGroup of permissionGroups) {
    const hasPermission = await prisma.permissionGroup.findFirst({
      where: { name: permissionGroup.name },
    });
    if (!hasPermission) {
      await prisma.permissionGroup.create({ data: permissionGroup });
    }
  }
};

const seedPermissionGroupsRules = async () => {
  const permissionGroupsRules = [
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: '63b33f45-568a-4415-874f-b04a7bc39645',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: 'e0721b89-de65-4c02-ac3f-db9ad29ddb40',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: '2bb1c581-1738-483e-bf93-c46afd12f972',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: '4cc02098-e623-4690-a155-10982abc57fa',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: 'ea116c24-25cf-49c7-9d51-4bed93b7d86e',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: '58184e5b-fc1e-4310-bf68-83b09f2b74ec',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: '7484b16c-1232-4deb-a846-cd5e16d22e02',
    },
    {
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
      permission_rule_id: '3ac8e22a-3c0d-446c-9566-51744b56f258',
    },
  ];

  for (const permissionGroupRule of permissionGroupsRules) {
    const hasPermission = await prisma.permissionGroupRule.findFirst({
      where: {
        permission_group_id: permissionGroupRule.permission_group_id,
        permission_rule_id: permissionGroupRule.permission_rule_id,
      },
    });
    if (!hasPermission) {
      await prisma.permissionGroupRule.create({ data: permissionGroupRule });
    }
  }
};

const seedUsers = async () => {
  const hashedPassword = await generateHash('01020304');
  const expiredAt = dateFutureDays(100000);
  const users: User[] = [
    {
      id: 'f3ea4819-0955-4839-815f-a92e13aadbb3',
      name: 'Orlando Nascimento',
      email: 'ocnascimento2@gmail.com',
      password: hashedPassword,
      expiredAt,
      phone: '11948108855',
      address: 'Rua Solar dos Quevedos, 06',
    },
    {
      id: '3117fdcb-2b3c-4814-a2a8-137df20b9b5d',
      name: 'Marcelo',
      email: 'marcelo.fatecpoa@gmail.com',
      expiredAt,
      password: hashedPassword,
      phone: '11911111111',
      address: '',
    },
    {
      id: '8e23b399-dede-47d8-aa04-3bb2885f43d8',
      name: 'Dono Sistema',
      email: 'dono@gmail.com',
      password: hashedPassword,
      expiredAt,
      phone: '11911111111',
      address: '',
    },
  ];

  for (const user of users) {
    const hasPermission = await prisma.user.findFirst({
      where: { email: user.email },
    });
    if (!hasPermission) {
      await prisma.user.create({ data: user });
    }
  }
};

const seedUsersPermissionGroup = async () => {
  const usersPermissionGroup = [
    {
      user_id: 'f3ea4819-0955-4839-815f-a92e13aadbb3',
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
    },
    {
      user_id: '3117fdcb-2b3c-4814-a2a8-137df20b9b5d',
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
    },
    {
      user_id: '8e23b399-dede-47d8-aa04-3bb2885f43d8',
      permission_group_id: '4c223da4-1af9-40ee-a1b9-dac27f6d3f69',
    },
  ];

  for (const userPermissionGroup of usersPermissionGroup) {
    const hasPermission = await prisma.userPermissionGroup.findFirst({
      where: {
        user_id: userPermissionGroup.user_id,
        permission_group_id: userPermissionGroup.permission_group_id,
      },
    });
    if (!hasPermission) {
      await prisma.userPermissionGroup.create({ data: userPermissionGroup });
    }
  }
};

const seed = async () => {
  await seedPermissionRules();
  await seedPermissionGroups();
  await seedPermissionGroupsRules();
  await seedUsers();
  await seedUsersPermissionGroup();
};

seed().then(() => {
  console.log('Database seeded!');
  prisma.$disconnect();
});
