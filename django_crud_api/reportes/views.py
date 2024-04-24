from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
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
