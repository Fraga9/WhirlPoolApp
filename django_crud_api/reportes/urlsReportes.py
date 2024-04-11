from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import EstatusViewSet, FotoViewSet, SucursalViewSet, RolesViewSet, EmpleadoViewSet, ReporteViewSet, PersonajeViewSet, EmpleadoPersonajeViewSet

router = routers.DefaultRouter()
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
    path('docs/', include_docs_urls(title='Documentación WhirlPool API'))

]