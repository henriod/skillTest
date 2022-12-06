from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from farms.models import Farm


class FarmSerializer(GeoFeatureModelSerializer):
    """A class to serialize farms as GeoJSON compatible data"""

    class Meta:
        model = Farm
        geo_field = "geo"
        auto_bbox = True
        fields = "__all__"


class FarmCsvUploadSerializer(serializers.Serializer):
    """A class to upload file for data population"""

    csv_file = serializers.FileField()

    class Meta:
        fields = ["csv_file"]
