from django.test import TestCase
from django.contrib.gis.geos import fromstr
from farms.models import Farm


class FarmTest(TestCase):
    """Test module for Puppy model"""

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

    def test_farm_soc(self):
        farm_ahero = Farm.objects.get(farm_name="Ahero Swamp")
        farm_muffin = Farm.objects.get(farm_name="Muffin")
        self.assertEqual(farm_ahero.soc, 130000)
        self.assertEqual(farm_muffin.soc, 100000)
