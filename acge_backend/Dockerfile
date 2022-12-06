FROM python:3.10.6
FROM osgeo/gdal:ubuntu-small-3.5.2

# Python Domain
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update  \
    && apt-get install build-essential binutils -y

RUN apt-get install python3-pip -y

# Files location
RUN mkdir -p /backend
RUN mkdir -p /backend/static
RUN mkdir -p /backend/media

# Set working directory
WORKDIR /backend

# Copy depency file
COPY requirements.txt /backend/requirements.txt
#COPY database/db.sql /docker-entrypoint-initdb.d/

# install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /backend/requirements.txt

# Clean up
RUN apt-get purge -y binutils postgresql-client
RUN rm -rf /var/lib/apt/lists/*
# Copy all files to workingdir
COPY . .

# Print working directory
RUN echo "$PWD"
RUN echo $(ls -a /backend)

# Give docker write and read access
RUN sed -i 's/\r$//g' /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh

#USER cropdig

ENTRYPOINT ["/backend/entrypoint.sh"]