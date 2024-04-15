import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
from reportes.models import Estatus, Foto, Sucursal, Roles, Empleado, Reporte, Personaje, EmpleadoPersonaje

def migrate_to_firestore():
    load_dotenv()

    cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS"))
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)

    # Get a reference to the Firestore service
    db = firestore.client()

    # Get all objects
    estatus_objects = Estatus.objects.all()
    foto_objects = Foto.objects.all()
    sucursal_objects = Sucursal.objects.all()
    roles_objects = Roles.objects.all()
    empleado_objects = Empleado.objects.all()
    reporte_objects = Reporte.objects.all()
    personaje_objects = Personaje.objects.all()
    empleado_personaje_objects = EmpleadoPersonaje.objects.all()

    # Migrate Estatus objects
    for e in estatus_objects:
        doc_ref = db.collection('estatus').document(str(e.id_status))
        doc_ref.set({
            'estatus': e.estatus
        })

    # Migrate Foto objects
    # Note: You'll need to convert the ImageField to a format Firestore can handle
    for f in foto_objects:
        doc_ref = db.collection('foto').document(str(f.id_foto))
        doc_ref.set({
            'archivo_foto': str(f.archivo_foto)  # Convert ImageField to string
        })

    # Migrate Sucursal objects
    for s in sucursal_objects:
        doc_ref = db.collection('sucursal').document(str(s.id_sucursal))
        doc_ref.set({
            'nombre_sucursal': s.nombre_sucursal,
            'latitud': float(s.latitud),  # Convert DecimalField to float
            'longitud': float(s.longitud)  # Convert DecimalField to float
        })

    # Migrate Roles objects
    for r in roles_objects:
        doc_ref = db.collection('roles').document(str(r.id_rol))
        doc_ref.set({
            'rol': r.rol
        })

    # Migrate Empleado objects
    # Note: You'll need to convert the ImageField to a format Firestore can handle
    for e in empleado_objects:
        doc_id = f"{e.id_empleado} {e.nombre} {e.apellido}"
        doc_ref = db.collection('empleado').document(doc_id)
        doc_ref.set({
            'nombre': e.nombre,
            'apellido': e.apellido,
            'numero_empleado': e.numero_empleado,
            'numero_celular': e.numero_celular,
            'email': e.email,
            'foto_perfil': str(e.foto_perfil),  # Convert ImageField to string
            'puntos_trabajo': e.puntos_trabajo,
            'puntos_juego': e.puntos_juego,
            'tiradas_juego': e.tiradas_juego,
            'monedas_juego': e.monedas_juego,
            'rol': e.rol.id_rol  # Store the ID of the related Rol object
        })

    # Migrate Reporte objects
    for r in reporte_objects:
        doc_ref = db.collection('reporte').document(str(r.id_reporte))
        doc_ref.set({
            'motivo': r.motivo,
            'descripcion': r.descripcion,
            'reportador': r.reportador.id_empleado,  # Store the ID of the related Empleado object
            'fecha_reporte': r.fecha_reporte,
            'asignador': r.asignador.id_empleado,  # Store the ID of the related Empleado object
            'fecha_asignacion': r.fecha_asignacion,
            'promotor': r.promotor.id_empleado,  # Store the ID of the related Empleado object
            'fecha_atendido': r.fecha_atendido,
            'puntaje': r.puntaje,
            'sucursal': r.sucursal.id_sucursal,  # Store the ID of the related Sucursal object
            'foto': r.foto.id_foto,  # Store the ID of the related Foto object
            'status': r.status.id_status  # Store the ID of the related Estatus object
        })

    # Migrate Personaje objects
    for p in personaje_objects:
        doc_ref = db.collection('personaje').document(str(p.id_personaje))
        doc_ref.set({
            'nombre_personaje': p.nombre_personaje,
            'bonificador': float(p.bonificador)  # Convert DecimalField to float
        })

    # Migrate EmpleadoPersonaje objects
    for ep in empleado_personaje_objects:
        doc_ref = db.collection('empleado_personaje').document(str(ep.id))
        doc_ref.set({
            'empleado': ep.empleado.id_empleado,  # Store the ID of the related Empleado object
            'personaje': ep.personaje.id_personaje,  # Store the ID of the related Personaje object
            'nivel_actual': ep.nivel_actual,
            'en_uso': ep.en_uso
        })






