# syntax=docker/dockerfile:1

# start image with node base image
FROM denoland/deno

EXPOSE 8000

ENV NODE_ENV=production

# Set /build as working dir for any command below
WORKDIR /app

COPY . .

RUN deno cache --reload --lock=deno.lock --lock-write main.ts

CMD [ "task", "start"]