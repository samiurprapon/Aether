# build image 
FROM node:lts-alpine

# create destination directory
COPY . ../app

# set working directory
WORKDIR /app

# environment variables
ENV NODE_ENV=development

# install app dependencies
RUN yarn 

# expose port and start application
EXPOSE 3030

# start command
CMD ["yarn", "run", "dev"]