from django.urls import path
from .views import *

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("subjects/", SubjectView.as_view(), name="subjects"),
    path("days/", DayView.as_view(), name="days"),
    path("profile/<str:username>/", UserProfileView.as_view(), name="user_profile"),
    path("profile/edit/", UserProfileUpdateView.as_view(), name="edit_profile"),
    path("volunteers/", VolunteerView.as_view(), name="volunteers"),
]
