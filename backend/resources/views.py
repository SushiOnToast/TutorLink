from django.shortcuts import render
from rest_framework import generics
from .models import Resource, Tag, Category
from .serializers import ResourceSerialiser, TagSerialiser, CategorySerialiser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class CreateResourceView(generics.ListCreateAPIView):
    serializer_class = ResourceSerialiser
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Resource.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class AllResourceView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resources = Resource.objects.all()
        tags = request.query_params.getlist("tags")
        categories = request.query_params.getlist("categories")

        if tags:
            resources = resources.filter(tags__id__in=tags).distinct()
        
        if categories:
            resources = resources.filter(categories__id__in=categories).distinct()

        serializer = ResourceSerialiser(resources, many=True)
        return Response(serializer.data)

class ResourceDetailView(generics.RetrieveAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerialiser
    permission_classes = [IsAuthenticated]
    lookup_field = "slug"

class DeleteResourceView(generics.DestroyAPIView):
    serializer_class = ResourceSerialiser
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Resource.objects.filter(author=user)

class TagView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerialiser
    permission_classes = [IsAuthenticated]

class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialiser
    permission_classes = [IsAuthenticated]
