# Generated by Django 5.1.2 on 2024-11-18 15:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_usuarios_telefono_usuarios_empresa_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarios',
            name='Empresa',
        ),
        migrations.RemoveField(
            model_name='usuarios',
            name='Usuario',
        ),
        migrations.AddField(
            model_name='usuarios',
            name='user',
            field=models.OneToOneField(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='perfil', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usuarios',
            name='empresa',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='empleados', to='api.empresa'),
        ),
    ]