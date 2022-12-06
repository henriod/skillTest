FROM node:16 as node
RUN mkdir -p /home/web
WORKDIR /home/web
COPY . /home/web

RUN apt update -y
RUN npm install -g @angular/cli -y
RUN npm install
RUN ng build

# Print working directory
RUN echo "$PWD"
RUN echo $(ls -a /home/web/)

FROM nginx:alpine

COPY --from=node /home/web/dist/acge-web/ /var/www/acgeWeb/
