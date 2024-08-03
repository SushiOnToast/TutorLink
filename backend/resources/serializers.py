from rest_framework import serializers
from .models import Resource, Tag, Category


class CategorySerialiser(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TagSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class ResourceSerialiser(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="author.username")
    categories = CategorySerialiser(many=True, read_only=True)
    tags = TagSerialiser(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="categories", many=True, write_only=True
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), source="tags", many=True, write_only=True
    )

    class Meta:
        model = Resource
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "resource_type",
            "author",
            "author_username",
            "created_at",
            "tags",
            "categories",
            "tag_ids",
            "category_ids",
        ]
        extra_kwargs = {
            "author": {"read_only": True},
            "created_at": {"read_only": True},
        }
    
    # def create(self, validated_data):
    #     tag_ids = validated_data.pop("tag_ids")
    #     category_ids = validated_data.pop("category_ids")
    #     resource = Resource.objects.create(**validated_data)
    #     resource.tags.set(tag_ids)
    #     resource.categories.set(category_ids)
    #     return resource
    
    # def update(self, instance, validated_data):
    #     tag_ids = validated_data.pop("tag_ids")
    #     category_ids = validated_data.pop("category_ids")
    #     instance.tags.set(tag_ids)
    #     instance.categories.set(category_ids)

    #     return super().update(instance, validated_data)
