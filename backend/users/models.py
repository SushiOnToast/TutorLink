from django.db import models
from django.contrib.auth.models import AbstractUser
import pytz

class Subject(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class Day(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class User(AbstractUser):
    ROLE_CHOICES = (
        ("student", "Student"),
        ("volunteer", "Volunteer"),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")
    name = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    subjects = models.ManyToManyField('Subject', blank=True)
    days = models.ManyToManyField('Day', blank=True)
    time_zone = models.CharField(max_length=63, default=pytz.utc.zone)
    about_me = models.TextField(null=True)

    def __str__(self):
        return self.username
