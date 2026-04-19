FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npx playwright install chromium --with-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]