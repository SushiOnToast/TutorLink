from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *


class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ("username", "email", "role", "name", "age", "is_staff", "time_zone")
    fieldsets = BaseUserAdmin.fieldsets + (
        (
            None,
            {"fields": ("role", "name", "age", "subjects", "time_zone", "about_me")},
        ),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (
            None,
            {"fields": ("role", "name", "age", "subjects", "time_zone", "about_me")},
        ),
    )
    filter_horizontal = ("subjects",)


models = [Subject, Day]
admin.site.register(User, UserAdmin)
admin.site.register(models)
