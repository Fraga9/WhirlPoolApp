from django.db import models
from django.utils import timezone


def get_default_status():
    return Estatus.objects.get(id_status=3)


class Estatus(models.Model):
    id_status = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=20, choices=[('Cancelado', 'Cancelado'), ('Finalizado', 'Finalizado'), ('Enviado', 'Enviado'), ('Asignado', 'Asignado')])
    def __str__(self):
        return self.estatus

class Foto(models.Model):
    id_foto = models.AutoField(primary_key=True)
    archivo_foto = models.ImageField(upload_to='fotos/', default='fotos/default.jpg')
    reporte = models.ForeignKey('Reporte', on_delete=models.CASCADE, related_name='fotos', null=True)

class Sucursal(models.Model):
    id_sucursal = models.AutoField(primary_key=True)
    nombre_sucursal = models.CharField(max_length=30)
    latitud = models.DecimalField(max_digits=14, decimal_places=7)
    longitud = models.DecimalField(max_digits=14, decimal_places=7)
    def __str__(self):
        return self.nombre_sucursal

class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=20, choices=[('empleado', 'Empleado'), ('promotor', 'Promotor'), ('supervisor', 'Supervisor')])
    def __str__(self):
        return self.rol

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
    def __str__(self):
        return self.nombre + ' ' + self.apellido

class Reporte(models.Model):
    id_reporte = models.AutoField(primary_key=True)
    motivo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    comentario = models.CharField(max_length=255, null=True, blank=True)
    reportador = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportes_reportador')
    fecha_reporte = models.DateTimeField(auto_now_add=True)
    asignador = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportes_asignador', null=True, blank=True)
    fecha_asignacion = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    promotor = models.ForeignKey(Empleado, on_delete=models.CASCADE, related_name='reportes_promotor', null=True, blank=True)
    fecha_atendido = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    puntaje = models.IntegerField(null=True, blank=True)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name='reportes')
    status = models.ForeignKey(Estatus, on_delete=models.CASCADE, related_name='reportes', default=get_default_status)
    def __str__(self):
        return  str(self.id_reporte) + '. ' + self.motivo

class Personaje(models.Model):
    id_personaje = models.AutoField(primary_key=True)
    nombre_personaje = models.CharField(max_length=50)
    bonificador = models.DecimalField(max_digits=3, decimal_places=1)
    def __str__(self):
        return self.nombre_personaje


class EmpleadoPersonaje(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    personaje = models.ForeignKey(Personaje, on_delete=models.CASCADE)
    nivel_actual = models.IntegerField()
    en_uso = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['empleado', 'personaje'], name='empleado_personaje_unique')
        ]