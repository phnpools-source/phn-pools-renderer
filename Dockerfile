FROM mcr.microsoft.com/playwright:v1.48.0-noble

WORKDIR /app

COPY package*.json ./

# Fixed line — uses npm install instead of npm ci
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]