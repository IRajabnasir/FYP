from pathlib import Path

from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Vehicle, Violation
from ai.infer import analyze_image


class AnalyzeView(APIView):
    def post(self, request):
        img = request.FILES.get("image")
        if not img:
            return Response({"error": "image is required (multipart/form-data key: image)"}, status=400)

        # Save upload temporarily
        temp_path = default_storage.save(f"tmp/{img.name}", img)
        full_path = Path(default_storage.path(temp_path))

        result = analyze_image(full_path)

        if not result:
            return Response({"message": "No violation detected"}, status=200)

        # Create/lookup vehicle
        vehicle, _ = Vehicle.objects.get_or_create(
            plate_number=result["plate_number"],
            defaults={"owner_name": "UNKNOWN"},
        )

        # Create violation
        v = Violation.objects.create(
            vehicle=vehicle,
            violation_type="no_helmet",
            fine_amount=500.00,
            location="Live Camera",
            evidence_url=result["evidence_url"],
            status="pending",
        )

        return Response(
            {
                "id": v.id,
                "vehicle_plate": vehicle.plate_number,
                "violation_type": v.violation_type,
                "evidence_url": v.evidence_url,
            },
            status=201,
        )

