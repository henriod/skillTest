import uuid
from django.contrib.gis.db import models

# Create your models here.
"""
Farm model with required record fields
"""


class Farm(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    farm_name = models.CharField(max_length=200)
    soc = models.FloatField()
    geo = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.farm_name
