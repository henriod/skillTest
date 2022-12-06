# ACGE API

This is a repo for acge API developed using Django Framework

## Installation

Make sure you have a PostGIS-enabled PostgreSQL database \
Create and activate the python virtual environment then,

```bash
pip install -r requirements.txt
```

Create a '.env' file in this directory and populate it with the correct Django and PostGIS credentials (secret_key = "django-insecure-n=ofo^&1^z-w\*jeio#zh&zj2je52y+zr4+)izlqt_b20cx!1q@")

```sh
SECRET_KEY=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

## Usage

To run the application

```bash
python manage.py runserver
```

To run test

```bash
python manage.py test
```

Then visit http://localhost:8000/docs \
and test the end-points
