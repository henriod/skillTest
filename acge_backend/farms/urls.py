"""
Url for the farm application with DRF router
Available end-points icludes:
(crud)-/farms/
(get) -/farms/worst3_farms/
(get) -/farms/best3_farms/
(post)-/farms/upload_csv/
and default auth urls from DRF
"""
from django.urls import path, include
from rest_framework import routers
from farms.api.views import FarmViewSet

router = routers.SimpleRouter()
router.register(r"farms", FarmViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls")),
]
