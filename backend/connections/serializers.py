from rest_framework import serializers
from .models import *


class ConnectionRequestSerialiser(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source="sender.username")
    receiver_username = serializers.ReadOnlyField(source="receiver.username")

    class Meta:
        model = ConnectionRequest
        fields = [
            "id",
            "sender",
            "receiver",
            "sender_email",
            "receiver_email",
            "status",
            "created_at",
            "updated_at",
            "sender_username",
            "receiver_username",
        ]
        read_only_fields = ["sender", "status", "created_at", "updated_at"]


class OngoingConnectionSerializer(serializers.ModelSerializer):
    student_username = serializers.ReadOnlyField(source="student.username")
    volunteer_username = serializers.ReadOnlyField(source="volunteer.username")
    student_email = serializers.ReadOnlyField(source="student.email")
    volunteer_email = serializers.ReadOnlyField(source="volunteer.email")

    class Meta:
        model = OngoingConnection
        fields = [
            "id",
            "student",
            "volunteer",
            "created_at",
            "student_username",
            "volunteer_username",
            "student_email",
            "volunteer_email",
        ]
