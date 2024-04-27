from rest_framework import serializers
from .models import Estatus, Foto, Sucursal, Roles, Empleado, Reporte, Personaje, EmpleadoPersonaje

class EstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatus
        fields = '__all__'


class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Empleado
        fields = '__all__'
    


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'

class PersonajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personaje
        fields = '__all__'

class EmpleadoPersonajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpleadoPersonaje
        fields = '__all__'

