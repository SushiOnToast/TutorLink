from django.db import models
from users.models import User


class ConnectionRequest(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    )

    sender = models.ForeignKey(
        User, related_name="sent_requests", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name="received_requests", on_delete=models.CASCADE
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    sender_email = models.EmailField(null=True)
    receiver_email = models.EmailField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.sender.username} --> {self.receiver.username} ({self.status})"


class OngoingConnection(models.Model):
    student = models.ForeignKey(
        User, related_name="student_connections", on_delete=models.CASCADE
    )
    volunteer = models.ForeignKey(
        User, related_name="volunteer_connections", on_delete=models.CASCADE
    )
    sender_email = models.EmailField(null=True)
    volunteer_email = models.EmailField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} <--> {self.volunteer.username}"
