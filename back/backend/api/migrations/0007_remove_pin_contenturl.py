# Generated by Django 3.2 on 2023-05-03 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20230416_1656'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pin',
            name='contentUrl',
        ),
    ]
