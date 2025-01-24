FROM node:18 AS base

RUN apt update \
	&& apt install -y locales 

USER node
RUN locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV PATH=${PATH}:node_modules/.bin

WORKDIR /src

CMD [ "/bin/bash" ]

# ---
FROM base AS prod

COPY package*.json ./
RUN npm ci

CMD ["npm", "run", "start"]

# ---
FROM prod AS dev
CMD ["npm", "run", "start:mon"]

# ---
FROM prod AS debug
EXPOSE 9229
CMD ["npm", "run", "test:debug"]