FROM node:22.14.0-alpine

WORKDIR /jira-clone-be

COPY ./dist /jira-clone-be/dist
COPY ./package.json /jira-clone-be/package.json

RUN npm i --omit=dev

EXPOSE 3000

CMD [ "node", "/jira-clone-be/dist/main.js" ]