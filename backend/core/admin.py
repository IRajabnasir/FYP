from django.contrib import admin
from .models import Vehicle, Violation

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("id", "plate_number", "owner_name")
    search_fields = ("plate_number", "owner_name")

@admin.register(Violation)
class ViolationAdmin(admin.ModelAdmin):
    list_display = ("id", "vehicle", "violation_type", "fine_amount", "status", "created_at")
    list_filter = ("status", "violation_type")
    search_fields = ("vehicle__plate_number", "location")
