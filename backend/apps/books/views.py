from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework_guardian import filters
# from guardian.shortcuts import assign_perm

from .models import Book
from apps.users.models import UserProfile
from .serializers import BookSerializer
# from .permissions import CustomObjectPermissions

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    parser_class = (MultiPartParser, FormParser)
    # permission_classes = [CustomObjectPermissions]
    # filter_backends = [filters.ObjectPermissionsFilter]

    def get_queryset(self):
        queryset = Book.objects.all()

        owner_param = self.request.query_params.get('owner')

        if owner_param == 'current_user':
            auth0_user_id = self.request.user.username  # Auth0 user ID stored in username
            try:
                user_profile = UserProfile.objects.get(auth0_user_id=auth0_user_id)
                queryset = queryset.filter(owner=user_profile)
            except UserProfile.DoesNotExist:
                queryset = Book.objects.none()

        return queryset

    def perform_create(self, serializer):
        user_profile = UserProfile.objects.get(auth0_user_id=self.request.user.username)
        serializer.save(owner=user_profile)
        # assign_perm('change_book', self.request.user, instance)
        # assign_perm('delete_book', self.request.user, instance)
    