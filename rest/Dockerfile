FROM adoptopenjdk/openjdk11:alpine-jre
COPY /target/dictionary-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080:8080
EXPOSE 1433:1433

ENTRYPOINT ["java", "-jar", "/app/app.jar"]