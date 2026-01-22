FROM postgres:15

ENV POSTGRES_DB=retaildb
ENV POSTGRES_USER=retailuser
ENV POSTGRES_PASSWORD=retailpass

COPY schema.sql /docker-entrypoint-initdb.d/
