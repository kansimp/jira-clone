FROM node:22.14.0-alpine

WORKDIR /jira-clone-be

COPY dist /jira-clone-be/dist
COPY package.json /jira-clone-be/package.json
COPY prisma /jira-clone-be/prisma
COPY .docker/scripts/entrypoint.sh /jira-clone-be/entrypoint.sh

RUN npm i --omit=dev
RUN chmod +x /jira-clone-be/entrypoint.sh

CMD ["/jira-clone-be/entrypoint.sh"]