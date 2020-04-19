FROM node:alpine as builder
ARG REACT_APP_STRIPE_KEY
ARG REACT_APP_GOOGLE_API
ENV REACT_APP_STRIPE_KEY=$REACT_APP_STRIPE_KEY
ENV REACT_APP_GOOGLE_API=$REACT_APP_GOOGLE_API
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html