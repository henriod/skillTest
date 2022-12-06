# ACGE Project

This is a repo for testing my skills in Gis development with Django PostGIS, leaflet, and angular

## Project Structure

- acge-web: this contains angular project files, for development cd inside
- acge_backend: This contains the Django project file, for development cd inside
- data_sample: This contains sample data used in this project for testing
- nginx: Nginx configuration files

## Installation and Config

Install 'docker' and 'docker-compose' and make sure they are working fine \
Then run the below code to enable you to run the bash script

```bash
chown +x start.sh
```

Run the script below it will:

- Create and configure the Postgis container
- Create and configure the Django server container and install all requirements
- Create Nginx contains and build angular
- Serve the application

```bash
./start.sh
```

If it fails due to permissions try with 'sudo'

## Usage

By default, the script will expose

API docs at http://0.0.0.0:8008/docs \
Website at https://0.0.0.0:4200 \
Django Admin at http://0.0.0.0:8000/admin \
(username:janedore, password:test1234) login credentials

## Configuration

Please have a look at docker-c0mpose.yml for available configurations e.g ports \
Check angular environments and Django settings cors-allowed-origin

## Future Consideration for Production

For this application to be ready for production we need to:

- Add more tests in both the backend and frontend
- Have a UI/UX Designer do the design for the website
- Add User-Management for access management
- SSL Certs
- Database backups through cron jobs
