from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import SimpleRouter
from rest_framework.documentation import include_docs_urls
from .views import EstatusViewSet, FotoViewSet, SucursalViewSet, RolesViewSet, EmpleadoViewSet, ReporteViewSet, PersonajeViewSet, EmpleadoPersonajeViewSet
from .views import transcribe_audio
from .views import reportes_en_curso

router = routers.SimpleRouter()

# Comprobar si está guardado
router.register('estatus', EstatusViewSet)
router.register('foto', FotoViewSet)
router.register('sucursal', SucursalViewSet)
router.register('roles', RolesViewSet)
router.register('empleado', EmpleadoViewSet)
router.register('reporte', ReporteViewSet)
router.register('personaje', PersonajeViewSet)
router.register('empleadopersonaje', EmpleadoPersonajeViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='Documentación WhirlPool API')),
    path('transcribe/', transcribe_audio, name='transcribe'),
    path('reportes_pendientes/', reportes_en_curso, name='reportes_pendientes')
]
