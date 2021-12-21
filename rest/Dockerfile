FROM adoptopenjdk/openjdk11:alpine-jre
COPY /target/dictionary-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8081:8081

ENTRYPOINT ["java","-Xms32m","-Xmx32m","-jar", "/app/app.jar"]