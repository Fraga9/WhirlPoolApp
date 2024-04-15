from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK
import os

from .serializer import (
    EstatusSerializer,
    FotoSerializer,
    SucursalSerializer,
    RolesSerializer,
    EmpleadoSerializer,
    ReporteSerializer,
    PersonajeSerializer,
    EmpleadoPersonajeSerializer,
)

import firebase_admin
from firebase_admin import credentials, firestore


class FirebaseCrudViewSet(viewsets.ViewSet):
    """
    CRUD operations for Firestore collections.
    """

    
    collection_name = None  # Override this in subclasses

    def get_firestore(self):
        cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS"))
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        return firestore.client()

    def get_collection(self):
        db = self.get_firestore()
        return db.collection(self.collection_name)

    def list(self, request):
        """
        Retrieves all documents from the collection.
        """
        documents = self.get_collection().stream()
        serializer = self.get_serializer(documents, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def retrieve(self, request, pk=None):
        """
        Retrieves a single document by its ID.
        """
        doc_ref = self.get_collection().document(pk)
        doc_snapshot = doc_ref.get()
        if not doc_snapshot.exists:
            return Response({"error": "Document not found"}, status=HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(doc_snapshot.to_dict())
        return Response(serializer.data, status=HTTP_200_OK)

    def create(self, request):
        """
        Creates a new document in the collection.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        doc_ref = self.get_collection().document()
        doc_ref.set(data)
        return Response(serializer.data, status=HTTP_201_CREATED)

    def update(self, request, pk=None):
        """
        Updates an existing document by its ID.
        """
        doc_ref = self.get_collection().document(pk)
        serializer = self.get_serializer(doc_ref.get().to_dict(), data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        doc_ref.update(data)
        return Response(serializer.data, status=HTTP_200_OK)

    def destroy(self, request, pk=None):
        """
        Deletes an existing document by its ID.
        """
        doc_ref = self.get_collection().document(pk)
        doc_ref.delete()
        return Response(status=HTTP_200_OK)
    
    def get_queryset(self):
        return []



class EstatusViewSet(FirebaseCrudViewSet):
    serializer_class = EstatusSerializer
    collection_name = "estatus"


class FotoViewSet(FirebaseCrudViewSet):
    serializer_class = FotoSerializer
    collection_name = "foto"

class SucursalViewSet(FirebaseCrudViewSet):
    serializer_class = SucursalSerializer
    collection_name = "sucursal"

class RolesViewSet(FirebaseCrudViewSet):
    serializer_class = RolesSerializer
    collection_name = "roles"

class EmpleadoViewSet(FirebaseCrudViewSet):
    serializer_class = EmpleadoSerializer
    collection_name = "empleado"

class ReporteViewSet(FirebaseCrudViewSet):
    serializer_class = ReporteSerializer
    collection_name = "reporte"

class PersonajeViewSet(FirebaseCrudViewSet):
    serializer_class = PersonajeSerializer
    collection_name = "personaje"

class EmpleadoPersonajeViewSet(FirebaseCrudViewSet):
    serializer_class = EmpleadoPersonajeSerializer
    collection_name = "empleadopersonaje"

