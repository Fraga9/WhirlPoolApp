from django.contrib import admin
from .models import Estatus, Foto, Sucursal, Roles, Empleado, Reporte, Personaje, EmpleadoPersonaje

# Register your models here.
admin.site.register(Estatus)
admin.site.register(Foto)
admin.site.register(Sucursal)
admin.site.register(Roles)
admin.site.register(Empleado)
admin.site.register(Reporte)
admin.site.register(Personaje)
admin.site.register(EmpleadoPersonaje)
