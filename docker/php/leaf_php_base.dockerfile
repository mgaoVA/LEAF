FROM php:7.3.5-apache as base
# FROM 7.4.18-apache-buster as base

# Set container to EST
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create runtime user
ARG BUILD_UID=1000
ENV REMOTE_USER=\\tester
RUN useradd -u $BUILD_UID -g www-data build_user

# Server installs
RUN apt-get update && apt-get install -y wget libpng-dev zlib1g-dev \
  libzip-dev git zip unzip iputils-ping netcat vim \
  mysql-client\
  apt-transport-https=1.4.10

# PHP installs
RUN docker-php-ext-install zip mysqli pdo pdo_mysql gd

COPY trust_ca_certs.sh /tmp/
RUN bash -xc "bash /tmp/trust_ca_certs.sh"

RUN a2enmod rewrite &&\
  a2enmod ssl &&\
  a2enmod env &&\
  a2enmod proxy &&\
  a2enmod proxy_http &&\
  a2enmod proxy_connect

# Self-signed cert creation and installing
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/certs/leaf.key -out /etc/ssl/certs/leaf.pem -subj "/C=US/ST=VA/L=Chantilly/O=LEAF/OU=LEAF/CN=%"

# Installation of composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

COPY etc/php-prod.ini "$PHP_INI_DIR/php.ini"
COPY etc/php-prod.ini "$PHP_INI_DIR/php-prod.ini"

# RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

RUN composer global require phpunit/phpunit ^7.4
RUN composer global require robmorgan/phinx ^0.9.2

ENV PATH /root/.composer/vendor/bin:$PATH

# The "Expose" really doesn't do anything except to log what ports the lister is listening on.
# Currently it _is_ listening on 80, but Traefik is routing all traffic to 443 long before it gets here.
# Once we get to Step 2, NGinx will be retired from even production.
EXPOSE 80
EXPOSE 443

# Mail()
RUN apt-get install -y ssmtp && \
  apt-get clean && \
  echo "FromLineOverride=YES" >> /etc/ssmtp/ssmtp.conf && \
  echo 'sendmail_path = "/usr/sbin/ssmtp -t"' > /usr/local/etc/php/conf.d/mail.ini

COPY ssmtp/ssmtp.conf /etc/ssmtp/
COPY swagger-proxy.conf /etc/apache2/conf-enabled/
COPY 000-default.conf /etc/apache2/sites-enabled/
COPY default-ssl.conf /etc/apache2/sites-enabled/
COPY etc/apache2.conf /etc/apache2/
RUN ln -s /etc/apache2/mods-available/speling.load /etc/apache2/mods-enabled/speling.load
## not sure if this is needed but...
RUN service apache2 restart 

COPY docker-php-entrypoint /usr/local/bin/docker-php-entrypoint
RUN chmod +x /usr/local/bin/docker-php-entrypoint

RUN chmod +x /var/www/html/
RUN chown -R www-data:www-data /var/www
RUN chmod -R g+rwX /var/www

ENV COMPOSER_ALLOW_SUPERUSER 1
# USER build_user

FROM base as legacy
RUN apt-get install -y subversion libapache2-mod-svn

# Installing SQL Server libs
RUN pear config-set php_ini $PHP_INI_DIR/php.ini
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN apt-get update
RUN apt-get -y --allow-unauthenticated install unixodbc-dev gnupg2 lsb-core libodbc1 odbcinst odbcinst1debian2 unixodbc-dev
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list
RUN curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN pecl install sqlsrv pdo_sqlsrv

RUN ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated msodbcsql17
# optional: for bcp and sqlcmd
RUN ACCEPT_EULA=Y apt-get install -y --allow-unauthenticated mssql-tools
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
# RUN source ~/.bashrc
ENV PATH $PATH:/opt/mssql-tools/bin



# RUN apt-get -y install gnupg2
# RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
# RUN curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list
# RUN pecl install sqlsrv pdo_sqlsrv

# ENV PATH=$PATH:/opt/mssql-tools/bin


