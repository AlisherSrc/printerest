# Generated by Django 3.2 on 2023-05-03 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20230503_1935'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='destinationLink',
            field=models.URLField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='pin',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]