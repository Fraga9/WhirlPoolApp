from django.db import models

class Estatus(models.Model):
    id_status = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=20)

class Foto(models.Model):
    id_foto = models.AutoField(primary_key=True)
    archivoFoto = models.CharField(max_length=100)

class Sucursal(models.Model):
    id_sucursal = models.AutoField(primary_key=True)
    nombreSucursal = models.CharField(max_length=30)
    latitud = models.DecimalField(max_digits=14, decimal_places=7)
    longitud = models.DecimalField(max_digits=14, decimal_places=7)

class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=20)

class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    numeroEmpleado = models.CharField(max_length=10)
    numeroCelular = models.CharField(max_length=15)
    email = models.EmailField(max_length=50)
    fotoPerfil = models.CharField(max_length=255)
    puntosTrabajo = models.IntegerField()
    puntosJuego = models.IntegerField()
    tiradasJuego = models.IntegerField()
    monedasJuego = models.IntegerField()
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE)

class Reporte(models.Model):
    id_reporte = models.AutoField(primary_key=True)
    motivo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    reportador = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportador')
    fechaReporte = models.DateTimeField()
    asignador = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='asignador')
    fechaAsignacion = models.DateTimeField()
    promotor = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='promotor')
    fechaAtendido = models.DateTimeField()
    puntaje = models.IntegerField()
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    foto = models.ForeignKey(Foto, on_delete=models.CASCADE)
    status = models.ForeignKey(Estatus, on_delete=models.CASCADE)

class Personaje(models.Model):
    id_personaje = models.AutoField(primary_key=True)
    nombre_personaje = models.CharField(max_length=50)
    bonificador = models.DecimalField(max_digits=3, decimal_places=1)

class EmpleadoPersonaje(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    personaje = models.ForeignKey(Personaje, on_delete=models.CASCADE)
    nivel_actual = models.IntegerField()
    enUso = models.BooleanField()

    class Meta:
        unique_together = ('empleado', 'personaje',)