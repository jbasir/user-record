FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:alpine

WORKDIR /usr/local/apache2/htdocs

COPY --from=build /app/dist/user-registration .

EXPOSE 80

CMD ["httpd-foreground"]