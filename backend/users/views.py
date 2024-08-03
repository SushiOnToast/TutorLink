from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, Subject, Day
from .serializers import *
from rest_framework.views import APIView


class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    permission_classes = [AllowAny]


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerialiser
    permission_classes = [IsAuthenticated]
    lookup_field = "username"

    def get_queryset(self):
        username = self.kwargs.get("username")
        return User.objects.filter(username=username)


class SubjectView(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerialiser
    permission_classes = [AllowAny]


class DayView(generics.ListAPIView):
    queryset = Day.objects.all()
    serializer_class = DaySerialiser
    permission_classes = [AllowAny]
class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = UserProfileEditingSerialiser(
            instance=user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()

class VolunteerView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_age = user.age
        subjects = request.query_params.getlist("subjects")
        days = request.query_params.getlist("days")

        volunteers = User.objects.filter(role="volunteer", age__gt=user_age)

        if subjects:
            volunteers = volunteers.filter(subjects__id__in=subjects).distinct()

        if days:
            volunteers = volunteers.filter(days__id__in=days).distinct()

        serializer = UserSerialiser(volunteers, many=True)
        return Response(serializer.data)
