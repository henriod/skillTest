from typing import Optional
import pandas as pd
from django.contrib.gis.geos import fromstr
from django.contrib.gis.geos import MultiPolygon
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from farms.models import Farm
from farms.api.serializers import FarmSerializer, FarmCsvUploadSerializer


class FarmViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    for farm list, create, edit, delete
    """

    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    parser_classes = (MultiPartParser,)  # For multipart form data upload files and data

    """
    Api endpoint for uploading csv of farm boundary must be in wkt 
    format of coordinate either polygon or multipolygon
    """

    @action(
        detail=False,
        methods=["post"],
        name="Upload Farm CSV file",
        serializer_class=FarmCsvUploadSerializer,
    )
    def upload_csv(self, request):
        serializer = FarmCsvUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data["csv_file"]
            reader = pd.read_csv(file)
            message = "Data added Successfully"
            for _, row in reader.iterrows():
                # We use try to prevent server from crushing on wrong data
                try:
                    geo = fromstr(row["Geolocation Boundaries"])
                except:
                    return Response(
                        {"details": "Farm boundary not a valid wkt"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                # Convert Polygon to Multipolygon is our modelfield is Multipolygon
                if geo.geom_type == "Polygon":
                    geo = MultiPolygon(geo)

                new_farm = Farm(
                    farm_name=row["Farm Name"],
                    soc=row["SOC (tonnes/hectare)"],
                    geo=geo,
                )
                if not (
                    Farm.objects.filter(geo=new_farm.geo)
                    or Farm.objects.filter(geo__overlaps=new_farm.geo)
                    or Farm.objects.filter(geo__within=new_farm.geo)
                ):
                    new_farm.save()
                else:
                    message += " except for:" + new_farm.farm_name + ", "
                # new_farm.save()
            return Response({"status": message}, status.HTTP_201_CREATED)
        else:
            return Response(
                {
                    "details": "There was an error adding you data please try again later"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    """
    Api endpoint for getting 3 Worst performing farm in terms of SOC amount
    Tie is not handled yet
    """

    @action(detail=False, name="Worst 3 Performing Farms")
    def worst_farms(self, request, pk=None):
        farms = Farm.objects.all().order_by("soc")[:3]

        page = self.paginate_queryset(farms)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(farms, many=True)
        return Response(serializer.data)

    """
    Api endpoint for getting 3 Best  performing farm in terms of SOC amount
    Tie is not handled yet
    Not NB the value 3 can be made to be query parameter for flexibility
    """

    @action(detail=False, name="Best 3 Performing Farms")
    def best_farms(self, request):
        farms = Farm.objects.all().order_by("-soc")[:3]

        page = self.paginate_queryset(farms)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(farms, many=True)
        return Response(serializer.data)
