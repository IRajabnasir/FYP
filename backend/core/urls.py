from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, ViolationViewSet
from .api import create_detection
from .views_ai import AnalyzeView

router = DefaultRouter()
router.register("vehicles", VehicleViewSet)
router.register("violations", ViolationViewSet)

urlpatterns = [
    path("analyze/", AnalyzeView.as_view(), name="analyze"),

    path("detections/", create_detection, name="detections-create"),
]

urlpatterns += router.urls
