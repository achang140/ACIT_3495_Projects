FROM mysql:latest
ENV MYSQL_DATABASE videos_db
ENV MYSQL_USER videouser
ENV MYSQL_PASSWORD Password
ENV MYSQL_ROOT_PASSWORD Password

EXPOSE 3306

COPY my.cnf /etc/mysql/conf.d/my.cnf
COPY schema.sql /docker-entrypoint-initdb.d/

CMD ["mysqld", "--defaults-file=/etc/mysql/conf.d/my.cnf"]