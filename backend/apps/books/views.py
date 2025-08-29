from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework_guardian import filters
# from guardian.shortcuts import assign_perm

from .models import Book
from .serializers import BookSerializer
# from .permissions import CustomObjectPermissions

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    parser_class = (MultiPartParser, FormParser)
    # permission_classes = [CustomObjectPermissions]
    # filter_backends = [filters.ObjectPermissionsFilter]

    # def perform_create(self, serializer):
    #     instance = serializer.save()
    #     assign_perm('change_book', self.request.user, instance)
    #     assign_perm('delete_book', self.request.user, instance)
    