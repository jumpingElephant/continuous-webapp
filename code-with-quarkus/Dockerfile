####
# Build the image with:
#
# docker build -t quarkus/code-with-quarkus-jvm .
#
# Then run the container using:
#
# docker run -i --rm -p 8080:8080 quarkus/code-with-quarkus-jvm
#
###
FROM maven:3.6.3-slim as BUILT

WORKDIR /opt/app

COPY pom.xml .
RUN mvn clean
RUN mvn dependency:resolve
RUN mvn -Dmaven.test.skip package

COPY src src
RUN ls -la
RUN ls -la src

RUN mvn -Dmaven.test.skip package
RUN ls -l target


FROM fabric8/java-alpine-openjdk8-jre
ENV JAVA_OPTIONS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV AB_ENABLED=jmx_exporter
COPY --from=BUILT /opt/app/target/lib/* /deployments/lib/
COPY --from=BUILT /opt/app/target/*-runner.jar /deployments/app.jar
EXPOSE 8080

# run with user 1001 and be prepared for be running in OpenShift too
RUN adduser -G root --no-create-home --disabled-password 1001 \
  && chown -R 1001 /deployments \
  && chmod -R "g+rwX" /deployments \
  && chown -R 1001:root /deployments
USER 1001

RUN ls -l /deployments
RUN cat /deployments/run-java.sh

ENTRYPOINT [ "/deployments/run-java.sh" ]