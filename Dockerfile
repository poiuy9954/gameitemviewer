FROM node:22-alpine as react-builder
LABEL maintainer="jhkim"
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM gradle:8.11.1-jdk17-corretto as builder
WORKDIR /app
COPY settings.gradle build.gradle .
RUN gradle dependencies --no-daemon
COPY --from=react-builder /frontend/build src/main/resources/static
COPY src ./src
RUN gradle clean build -x test --no-daemon

FROM amazoncorretto:17-al2-full
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "app.jar"]
