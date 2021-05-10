FROM node:16-alpine3.11
WORKDIR /Desktop/dev/tasks/ticket-manager
COPY ./package.json ./package-lock.json ./
RUN npm install --only=production
COPY . .
WORKDIR /Desktop/dev/tasks/ticket-manager/client
RUN npm install --only=production
RUN npm run build
EXPOSE 8080
WORKDIR /Desktop/dev/tasks/ticket-manager
ENV MONGO_URI="mongodb+srv://yuvalNakav:yuval123@cluster0.uq3xi.mongodb.net/TicketManager?retryWrites=true&w=majority"
CMD ["npm","start"]
