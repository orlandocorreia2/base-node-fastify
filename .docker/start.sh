#!/bin/bash
yarn install

yarn prisma:migrate

yarn prisma:seed

# yarn dev

# yarn start

tail -f /dev/null
