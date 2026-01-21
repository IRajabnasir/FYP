from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Vehicle, Violation
from .serializers import DetectionCreateSerializer, ViolationSerializer

@api_view(["POST"])
def create_detection(request):
    serializer = DetectionCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    plate_number = data["plate_number"].strip().upper()
    owner_name = data.get("owner_name", "").strip()

    vehicle, created = Vehicle.objects.get_or_create(
        plate_number=plate_number,
        defaults={"owner_name": owner_name},
    )

    if (not created) and owner_name and not vehicle.owner_name:
        vehicle.owner_name = owner_name
        vehicle.save(update_fields=["owner_name"])

    violation = Violation.objects.create(
        vehicle=vehicle,
        violation_type=data["violation_type"],
        fine_amount=data.get("fine_amount", 0),
        location=data.get("location", ""),
        evidence_url=data.get("evidence_url", ""),
        status="pending",
    )

    return Response(ViolationSerializer(violation).data, status=status.HTTP_201_CREATED)
