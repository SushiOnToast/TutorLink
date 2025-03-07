# Generated by Django 5.0.7 on 2024-08-02 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_remove_user_days_remove_user_timeslots'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='days',
            field=models.ManyToManyField(blank=True, to='users.day'),
        ),
        migrations.AddField(
            model_name='user',
            name='timeslots',
            field=models.ManyToManyField(blank=True, to='users.timeslot'),
        ),
    ]
