import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.conf import settings
from django.contrib.gis.geos import fromstr
from farms.models import Farm
from farms.api.serializers import FarmSerializer, FarmCsvUploadSerializer


# initialize the APIClient app
client = Client()
path = str(settings.BASE_DIR / "farms/tests/test_farms.csv")


class GetAllFarmsTest(TestCase):
    """Test module for GET all farms API"""

    def setUp(self):
        Farm.objects.create(
            farm_name="Ahero Swamp",
            soc=130000,
            geo=fromstr(
                "MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))"
            ),
        )
        Farm.objects.create(
            farm_name="Muffin",
            soc=100000,
            geo=fromstr(
                "MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)),((20 35, 10 30, 10 10, 30 5, 45 20, 20 35),(30 20, 20 15, 20 25, 30 20)))"
            ),
        )

    def test_get_all_farms(self):
        # get API response
        response = client.get("/api/v1/farms/")
        # get data from db
        farms = Farm.objects.all()
        serializer = FarmSerializer(farms, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetWorstPerforming(TestCase):
    def setUp(self):
        Farm.objects.create(
            farm_name="Ahero Swamp",
            soc=130000,
            geo=fromstr(
                "MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))"
            ),
        )

    def test_get_best_performing(self):
        response = client.get("/api/v1/farms/worst_farms/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetBestPerforming(TestCase):
    def setUp(self):
        Farm.objects.create(
            farm_name="Ahero Swamp",
            soc=130000,
            geo=fromstr(
                "MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))"
            ),
        )

    def test_get_best_performing(self):
        response = client.get("/api/v1/farms/best_farms/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UploadFarmAsCsv(TestCase):
    """
    This test sends a POST request to the /api/farms/upload_csv/
    endpoint with a CSV file containing two farms,
    and checks that the response has a 201 CREATED status code and
    that the added farms are in the database.
    """

    def test_upload_csv(self):
        # Set up the request data
        csv_file = open(path, "rb")
        data = {"csv_file": csv_file}

        # Send the request and check the response
        response = client.post("/api/v1/farms/upload_csv/", data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data["status"], "Data added successfully for: Farm 1, Farm 2."
        )

        # Check that the farms were added to the database
        farms = Farm.objects.all()
        self.assertEqual(len(farms), 2)
        self.assertEqual(farms[0].farm_name, "Farm 1")
        self.assertEqual(farms[1].farm_name, "Farm 2")
