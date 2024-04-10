from django.db import models
from django.utils import timezone


class Estatus(models.Model):
    id_status = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=20, choices=[('Pendiente', 'Pendiente'), ('Verificado', 'Verificado')])

class Foto(models.Model):
    id_foto = models.AutoField(primary_key=True)
    archivo_foto = models.ImageField(upload_to='fotos/', default='fotos/default.jpg')

class Sucursal(models.Model):
    id_sucursal = models.AutoField(primary_key=True)
    nombre_sucursal = models.CharField(max_length=30)
    latitud = models.DecimalField(max_digits=14, decimal_places=7)
    longitud = models.DecimalField(max_digits=14, decimal_places=7)

class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=20, choices=[('option1', 'Option 1'), ('option2', 'Option 2')])

class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    numero_empleado = models.CharField(max_length=10)
    numero_celular = models.CharField(max_length=15)
    email = models.EmailField(max_length=50)
    foto_perfil = models.ImageField(upload_to='fotos/', null=True, blank=True)
    puntos_trabajo = models.IntegerField()
    puntos_juego = models.IntegerField()
    tiradas_juego = models.IntegerField()
    monedas_juego = models.IntegerField()
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE, related_name='empleados')

class Reporte(models.Model):
    id_reporte = models.AutoField(primary_key=True)
    motivo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    reportador = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportes_reportador')
    fecha_reporte = models.DateTimeField(auto_now_add=True)
    asignador = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportes_asignador')
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    promotor = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportes_promotor')
    fecha_atendido = models.DateTimeField(auto_now_add=True)
    puntaje = models.IntegerField()
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name='reportes')
    foto = models.ForeignKey(Foto, on_delete=models.CASCADE, related_name='reportes')
    status = models.ForeignKey(Estatus, on_delete=models.CASCADE, related_name='reportes')

class Personaje(models.Model):
    id_personaje = models.AutoField(primary_key=True)
    nombre_personaje = models.CharField(max_length=50)
    bonificador = models.DecimalField(max_digits=3, decimal_places=1)

class EmpleadoPersonaje(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    personaje = models.ForeignKey(Personaje, on_delete=models.CASCADE)
    nivel_actual = models.IntegerField()
    en_uso = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['empleado', 'personaje'], name='empleado_personaje_unique')
        ]