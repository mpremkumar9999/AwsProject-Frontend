# ------------ STAGE 1: Build React App ------------
    FROM node:alpine3.18 AS build

    WORKDIR /app
    
    # Copy and install dependencies
    COPY package.json package-lock.json ./
    RUN npm install
    
    # Copy the rest of the app and build it
    COPY . .
    RUN npm run build
    
    
    # ------------ STAGE 2: Serve with Nginx ------------
    FROM nginx:1.23-alpine
    
    # Remove default Nginx website
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copy build output from previous stage
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copy custom Nginx config (optional)
    # COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    