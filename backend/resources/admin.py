from django.contrib import admin
from .models import *

class ResourceAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}

resource_models = [Resource, Tag, Category]
admin.site.register(resource_models)

