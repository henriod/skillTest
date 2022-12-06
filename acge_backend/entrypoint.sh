#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! curl http://$DB_HOST:$DB_PORT/ 2>&1 | grep '52'
    do
      sleep 1
    done

    echo "PostgreSQL started"
fi
echo "-------Apply database makemigrations------"
python manage.py makemigrations

echo "-------Apply database migrations------"
python manage.py migrate --noinput || exit 1

echo "-------Collect static------"
python manage.py collectstatic --no-input --clear

echo "-------Creating a superuser-------"
python manage.py shell -c "
from django.contrib.auth import get_user_model;
try:
  get_user_model().objects.create_superuser(username='janedoe',email='janedoe@example.com',password='test1234')
except Exception as e:
  print(e)
  "
echo "---------Starting Gunicorn Server at 8000----------"
gunicorn acge_backend.wsgi:application --bind 0.0.0.0:8000 --timeout 60000 --log-level=debug
exec "$@"
