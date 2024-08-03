# serializers.py
from rest_framework import serializers
from .models import User, Subject, Day


class SubjectSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "name"]


class DaySerialiser(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ["id", "name"]


class UserSerialiser(serializers.ModelSerializer):
    subjects = SubjectSerialiser(many=True, read_only=True)
    subject_ids = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(), source="subjects", many=True, write_only=True
    )
    days = DaySerialiser(many=True, read_only=True)
    day_ids = serializers.PrimaryKeyRelatedField(
        queryset=Day.objects.all(), source="days", many=True, write_only=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "username",
            "email",
            "password",
            "role",
            "age",
            "time_zone",
            "subjects",
            "subject_ids",
            "days",
            "day_ids",
            "about_me",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True
            }  # Password should only be writable and not readable
        }

    def create(self, validated_data):
        subjects = validated_data.pop("subjects", [])
        days = validated_data.pop("days", [])
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)  # Use set_password to hash the password
        user.save()

        # Set the subjects and days if they were provided
        if subjects:
            user.subjects.set(subjects)
        if days:
            user.days.set(days)
        return user



class UserProfileEditingSerialiser(serializers.ModelSerializer):
    subject_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Subject.objects.all(),
        write_only=True
    )
    day_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Day.objects.all(),
        write_only=True
    )

    class Meta:
        model = User
        fields = ['name', 'subject_ids', 'about_me', 'day_ids']

    def update(self, instance, validated_data):
        subject_ids = validated_data.pop('subject_ids', [])
        day_ids = validated_data.pop('day_ids', [])
        instance = super().update(instance, validated_data)
        instance.subjects.set(subject_ids)
        instance.days.set(day_ids)
        return instance
