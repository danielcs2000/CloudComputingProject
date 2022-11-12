FROM node:16.13.0-alpine AS ui-build 

RUN mkdir -p /home/app

COPY . /home/app

# install dependencies

WORKDIR /home/app/
RUN npm install && npm install prisma --save-dev  && npx prisma generate && npm run build

EXPOSE 3000


WORKDIR /home/app/
CMD npm run dev 

