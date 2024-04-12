import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
from reportes.models import Estatus, Foto, Sucursal, Roles, Empleado, Reporte


load_dotenv()

cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS"))
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

# Then you can use `db` to interact with your database. For example, to get a document:
doc_ref = db.collection('my_collection').document('my_document')
doc = doc_ref.get()
print(f'Document data: {doc.to_dict()}')

# Get objects
estatus = Estatus.objects.all()

for e in estatus:
    # Create a reference to the Firestore collection
    doc_ref = db.collection('estatus').document(str(e.id_status))



# Create a reference to a document
doc_ref = db.collection("test_colletion").document("test_document")

# Set data on the document
doc_ref.set({
    'name': 'test',
    'value': 10,
})

def test_connection():
    try:
        doc_ref = db.collection('test_collection').document('test_document')
        doc = doc_ref.get()
        print('Document data:', doc.to_dict())
        return True
    except Exception as e:
        print('Error getting document:', e)
        return False