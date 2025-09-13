from rest_framework import serializers
from .models import Book
from apps.users.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['name']  # include all relevant owner fields here


class BookSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer(read_only=True)
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'genre', 'description', 'cover_image', 'owner', 'condition']