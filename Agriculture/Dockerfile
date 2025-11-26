FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy only the files needed for a build. The project doesn't include a .mvn wrapper folder,
# so copy pom.xml and the source tree directly.
COPY pom.xml ./
COPY src ./src

# Build the application (skip tests for faster builds in CI/dev).
RUN mvn -f pom.xml -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
