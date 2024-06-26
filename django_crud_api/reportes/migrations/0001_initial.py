# Generated by Django 5.0.4 on 2024-04-10 16:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Estatus',
            fields=[
                ('id_status', models.AutoField(primary_key=True, serialize=False)),
                ('estatus', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Foto',
            fields=[
                ('id_foto', models.AutoField(primary_key=True, serialize=False)),
                ('archivoFoto', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Personaje',
            fields=[
                ('id_personaje', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_personaje', models.CharField(max_length=50)),
                ('bonificador', models.DecimalField(decimal_places=1, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id_rol', models.AutoField(primary_key=True, serialize=False)),
                ('rol', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Sucursal',
            fields=[
                ('id_sucursal', models.AutoField(primary_key=True, serialize=False)),
                ('nombreSucursal', models.CharField(max_length=30)),
                ('latitud', models.DecimalField(decimal_places=7, max_digits=14)),
                ('longitud', models.DecimalField(decimal_places=7, max_digits=14)),
            ],
        ),
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id_empleado', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('apellido', models.CharField(max_length=30)),
                ('numeroEmpleado', models.CharField(max_length=10)),
                ('numeroCelular', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=50)),
                ('fotoPerfil', models.CharField(max_length=255)),
                ('puntosTrabajo', models.IntegerField()),
                ('puntosJuego', models.IntegerField()),
                ('tiradasJuego', models.IntegerField()),
                ('monedasJuego', models.IntegerField()),
                ('rol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reportes.roles')),
            ],
        ),
        migrations.CreateModel(
            name='Reporte',
            fields=[
                ('id_reporte', models.AutoField(primary_key=True, serialize=False)),
                ('motivo', models.CharField(max_length=100)),
                ('descripcion', models.CharField(max_length=255)),
                ('fechaReporte', models.DateTimeField()),
                ('fechaAsignacion', models.DateTimeField()),
                ('fechaAtendido', models.DateTimeField()),
                ('puntaje', models.IntegerField()),
                ('asignador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asignador', to='reportes.empleado')),
                ('foto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reportes.foto')),
                ('promotor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='promotor', to='reportes.empleado')),
                ('reportador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reportador', to='reportes.empleado')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reportes.estatus')),
                ('sucursal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reportes.sucursal')),
            ],
        ),
        migrations.CreateModel(
            name='EmpleadoPersonaje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nivel_actual', models.IntegerField()),
                ('enUso', models.BooleanField()),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reportes.empleado')),
                ('personaje', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reportes.personaje')),
            ],
            options={
                'unique_together': {('empleado', 'personaje')},
            },
        ),
    ]
