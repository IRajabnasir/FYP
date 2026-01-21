from rest_framework import serializers
from .models import Vehicle, Violation


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"


class ViolationSerializer(serializers.ModelSerializer):
    vehicle_plate = serializers.CharField(source="vehicle.plate_number", read_only=True)

    class Meta:
        model = Violation
        fields = "__all__"


class DetectionCreateSerializer(serializers.Serializer):
    plate_number = serializers.CharField(max_length=32)
    owner_name = serializers.CharField(max_length=128, required=False, allow_blank=True)

    violation_type = serializers.CharField(max_length=64)
    fine_amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    location = serializers.CharField(max_length=255, required=False, allow_blank=True)
    evidence_url = serializers.URLField(required=False, allow_blank=True)
