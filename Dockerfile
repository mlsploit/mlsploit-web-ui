FROM node:10

EXPOSE 5000
EXPOSE 35729

WORKDIR /app

COPY package*.json ./
RUN npm install --quiet

ENTRYPOINT ["npm"]
CMD ["run", "dev"]
