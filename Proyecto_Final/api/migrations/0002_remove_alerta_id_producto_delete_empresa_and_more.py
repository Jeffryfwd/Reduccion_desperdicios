# Generated by Django 5.1.2 on 2025-01-17 04:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alerta',
            name='id_producto',
        ),
        migrations.DeleteModel(
            name='Empresa',
        ),
        migrations.RemoveField(
            model_name='inventario',
            name='Nombre_producto',
        ),
        migrations.RemoveField(
            model_name='reporte',
            name='Ventas_asociadas',
        ),
        migrations.DeleteModel(
            name='Alerta',
        ),
        migrations.DeleteModel(
            name='Inventario',
        ),
        migrations.DeleteModel(
            name='Reporte',
        ),
    ]
