from django.urls import path
from .views import *

urlpatterns = [
    path("", CreateResourceView.as_view(), name="create_resource"),
    path("library/", AllResourceView.as_view(), name="resource_library"),
    path("tags/", TagView.as_view(), name="tags"),
    path("categories/", CategoryView.as_view(), name="categories"),
    path("<slug:slug>/", ResourceDetailView.as_view(), name="resource_details"),
    path("delete/<int:pk>/", DeleteResourceView.as_view(), name="delete_resource"),
]