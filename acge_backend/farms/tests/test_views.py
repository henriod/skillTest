import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.gis.geos import fromstr
from farms.models import Farm
from farms.api.serializers import FarmSerializer, FarmCsvUploadSerializer


# initialize the APIClient app
client = Client()


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


class Get3WorstPerforming(TestCase):
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


class Get3BestPerforming(TestCase):
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


class UploadFarmAsCsv(TestCase):
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
