FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean install -U
EXPOSE 7000

FROM openjdk:21
COPY --from=build /build/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
