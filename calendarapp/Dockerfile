FROM gradle:jdk17-alpine as builder

COPY --chown=gradle:gradle . /home/gradle/src

WORKDIR /home/gradle/src

RUN gradle build --no-daemon



FROM openjdk:17-jdk-alpine

COPY --from=builder /home/gradle/src/build/libs/calendarapp-0.0.1-SNAPSHOT.jar calendarapp-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","/calendarapp-0.0.1-SNAPSHOT.jar"]