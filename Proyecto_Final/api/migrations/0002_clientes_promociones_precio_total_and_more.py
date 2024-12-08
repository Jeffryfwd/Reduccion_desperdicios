# Generated by Django 5.1.2 on 2024-12-08 03:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nombre_cliente', models.CharField(max_length=100)),
                ('Numero_telefono', models.CharField(max_length=100)),
                ('Correo_electronico', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='promociones',
            name='Precio_total',
            field=models.DecimalField(decimal_places=2, default=2, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='promociones',
            name='url_imagen',
            field=models.URLField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ventas',
            name='Cliente',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ventas',
            name='id_promociones',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.promociones'),
        ),
    ]
