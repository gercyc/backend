FROM node
RUN mkdir backend
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3001

