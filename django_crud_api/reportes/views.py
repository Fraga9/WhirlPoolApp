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
        rol = request.query_params.get('rol', None)
        if rol is not None:
            self.queryset = self.queryset.filter(rol=rol)
        serializer = EmpleadoSerializer(self.queryset, many=True, context={'request': request})
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
            'reportador': reporte.reportador.nombre,  # Suponiendo que hay un campo "nombre" en el modelo de reportador
            'foto_perfil': reporte.reportador.foto_perfil,
            'foto_reporte': reporte.foto,
            'fecha_reporte': reporte.fecha_reporte,
            'sucursal': reporte.sucursal.nombre_sucursal,  # Suponiendo que hay un campo "nombre" en el modelo de sucursal
            'motivo': reporte.motivo,
            'descripcion': reporte.descripcion,
        }
        data.append(detalle_reporte)

    return JsonResponse(data, safe=False)

