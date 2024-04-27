from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import EstatusSerializer, FotoSerializer, SucursalSerializer, RolesSerializer, EmpleadoSerializer, ReporteSerializer, PersonajeSerializer, EmpleadoPersonajeSerializer
from .models import Estatus, Foto, Sucursal, Roles, Empleado, Reporte, Personaje, EmpleadoPersonaje
from django.http import JsonResponse

#v2t
from pydub import AudioSegment
import speech_recognition as sr
import os
import io


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
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

    def list(self, request, *args, **kwargs):
        queryset = Empleado.objects.all()
        rol = request.query_params.get('rol', None)
        if rol is not None:
            queryset = queryset.filter(rol=rol)
        serializer = EmpleadoSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class ReporteViewSet(viewsets.ModelViewSet):
    serializer_class = ReporteSerializer
    queryset = Reporte.objects.all()

class PersonajeViewSet(viewsets.ModelViewSet):
    serializer_class = PersonajeSerializer
    queryset = Personaje.objects.all()

class EmpleadoPersonajeViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoPersonajeSerializer
    queryset = EmpleadoPersonaje.objects.all()

@api_view(['POST'])
def transcribe_audio(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided.'}, status=400)

    audio_file = request.FILES['file']

    # Leer audio
    audio_data = audio_file.read()

    # Convierte 3gp a wav
    audio = AudioSegment.from_file(io.BytesIO(audio_data))
    BASE_DIR = os.getcwd() 
    wav_directory = os.path.join(BASE_DIR, 'reportes', 'audios')
    wav_filename = 'AdiosVocals.wav'
    wav_path = os.path.join(wav_directory, wav_filename)

    print(wav_path)  
    
    audio.export(wav_path, format="wav")

    # Crea un reconocedor de voz
    r = sr.Recognizer()

    # Abre el archivo de audio
    with sr.AudioFile(wav_path) as source:
        transcript = ""
        
        # Lee el archivo de audio en segmentos de 60 segundos
        while True:
            audio_data = r.record(source, duration=60)
            # Convierte el audio a texto en español
            try:
                text = r.recognize_google(audio_data, language='es-ES')
                transcript += text + " "
            except sr.UnknownValueError:
                break

    # Elimina el archivo wav temporal
    os.remove(wav_path)

    return JsonResponse({'transcript': transcript})


from django.db.models import Q
from django.conf import settings
from django.templatetags.static import static

@api_view(['GET'])
def reportes_en_curso(request):
    # Filtra los reportes con estatus "enviado" o "asignado"
    reportes = Reporte.objects.filter(Q(status=3) | Q(status=4))

    # Serializa los detalles de los reportes
    data = []
    for reporte in reportes:
        detalle_reporte = {
            'id_reporte': reporte.id_reporte,
            'status': reporte.status.estatus,
            'reportador': reporte.reportador.nombre,
            'foto_perfil': request.build_absolute_uri(static(reporte.reportador.foto_perfil)),
            'foto_reporte': request.build_absolute_uri(static(reporte.foto)),
            'fecha_reporte': reporte.fecha_reporte,
            'sucursal': reporte.sucursal.nombre_sucursal,
            'motivo': reporte.motivo,
            'descripcion': reporte.descripcion,
        }
        data.append(detalle_reporte)

    return JsonResponse(data, safe=False)



@api_view(['GET'])
def personajes_empleado(request, id_empleado):
    try:
        personajes = EmpleadoPersonaje.objects.filter(empleado=id_empleado)
        data = []
        for personaje in personajes:
            personaje_data = {
                'id_empleado': personaje.empleado,
                'id_personaje': personaje.personaje,
                'nombre_personaje': personaje.personaje.nombre_personaje,
                'nivel_actual': personaje.nivel_actual,
            }
            data.append(personaje_data)
        return JsonResponse(data)
    except EmpleadoPersonaje.DoesNotExist:
        return Response({'error': 'No se encontraron datos para el empleado especificado'}, status=404)

def fotos_reporte(request, reporte_id):
    reporte = Reporte.objects.get(id_reporte=reporte_id)
    
    fotos = reporte.fotos.all()
    
    fotos_urls = [foto.archivo_foto.url for foto in fotos]
    
    return JsonResponse({'fotos': fotos_urls})
