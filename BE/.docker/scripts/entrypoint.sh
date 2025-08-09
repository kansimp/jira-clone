#!/bin/sh

npx prisma migrate deploy
node /jira-clone-be/dist/main.js

