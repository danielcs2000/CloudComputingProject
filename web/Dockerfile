FROM node:16-alpine AS ui-build 

WORKDIR /usr/src/
COPY . /usr/src

# install dependencies
RUN npm install && npm install prisma --save-dev  && npx prisma generate && npm run build

EXPOSE 3000

CMD npm run dev 

