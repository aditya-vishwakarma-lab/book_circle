"""
URL configuration for book_circle project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from apps.users import views as user_views
from apps.books import views as book_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'books', book_views.BookViewSet, basename='book')

urlpatterns = [
    path('api/public', user_views.public),
    path('api/private', user_views.private),
    path('api/private-scoped', user_views.private_scoped),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
