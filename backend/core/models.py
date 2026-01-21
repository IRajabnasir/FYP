from django.db import models

class Vehicle(models.Model):
    plate_number = models.CharField(max_length=32, unique=True)
    owner_name = models.CharField(max_length=128, blank=True)

    def __str__(self):
        return self.plate_number

class Violation(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("paid", "Paid"),
        ("rejected", "Rejected"),
    ]

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="violations")
    violation_type = models.CharField(max_length=64)
    fine_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    location = models.CharField(max_length=255, blank=True)
    evidence_url = models.URLField(blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vehicle.plate_number} - {self.violation_type}"
