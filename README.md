Project Title: Django CRUD API with React Native Frontend
This project is a combination of a Django backend with a React Native frontend. The Django backend provides a CRUD (Create, Read, Update, Delete) API, while the React Native frontend provides a user interface for interacting with the API.

Backend
The backend is a Django project located in the django_crud_api directory. It uses Django Rest Framework to create a CRUD API. The main application in this project is reportes, which handles the CRUD operations.

The backend also uses the corsheaders middleware to handle Cross-Origin Resource Sharing (CORS), allowing the frontend to communicate with the backend.

The database used in this project is SQLite, as specified in the DATABASES setting in django_crud_api/django_crud_api/settings.py.

Frontend
The frontend is a React Native project located in the whirlpool-app directory. It uses Expo for the development environment. The main entry point for the application is App.js.

The frontend uses several libraries such as react-navigation for navigation, axios for making HTTP requests, and expo-camera, expo-image-picker, expo-location, expo-media-library, and expo-permissions for handling various device features.

Getting Started
To get started with this project:

Clone the repository.
Navigate to the django_crud_api directory and run python manage.py runserver to start the Django server.
Navigate to the whirlpool-app directory and run npm install to install the necessary dependencies.
Run npm start to start the Expo development server.
