FROM node:20 AS build

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
