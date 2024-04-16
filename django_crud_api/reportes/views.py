from django.shortcuts import render
from rest_framework import viewsets
from .serializer import EstatusSerializer, FotoSerializer, SucursalSerializer, RolesSerializer, EmpleadoSerializer, ReporteSerializer, PersonajeSerializer, EmpleadoPersonajeSerializer
from .models import Estatus, Foto, Sucursal, Roles, Empleado, Reporte, Personaje, EmpleadoPersonaje



class EstatusViewSet(viewsets.ModelViewSet):
    serializer_class = EstatusSerializer
    queryset = Estatus.objects.all()

class FotoViewSet(viewsets.ModelViewSet):
    serializer_class = FotoSerializer
    queryset = Foto.objects.all()

class SucursalViewSet(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()

class RolesViewSet(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Roles.objects.all()

class EmpleadoViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()

class ReporteViewSet(viewsets.ModelViewSet):
    serializer_class = ReporteSerializer
    queryset = Reporte.objects.all()

class PersonajeViewSet(viewsets.ModelViewSet):
    serializer_class = PersonajeSerializer
    queryset = Personaje.objects.all()

class EmpleadoPersonajeViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoPersonajeSerializer
    queryset = EmpleadoPersonaje.objects.all()
