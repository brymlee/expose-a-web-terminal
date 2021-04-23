FROM docker.io/brymlee1911/arch-podman:latest
RUN pacman -Syu nodejs npm curl --noconfirm
RUN mkdir expose-a-web-terminal
WORKDIR expose-a-web-terminal
COPY package.json package.json
RUN npm i
RUN npm update
COPY src src
COPY tsconfig.json tsconfig.json
RUN npm run compile
COPY LICENSE LICENSE
COPY index.html index.html
COPY webpack.config.js webpack.config.js
COPY .babelrc .babelrc
USER root
EXPOSE 8080
CMD ["/usr/bin/npm", "run", "serve"]
