#!/bin/bash
yarn install

yarn prisma:migrate

yarn prisma:seed

npx playwright install

# yarn dev

# yarn start

tail -f /dev/null
