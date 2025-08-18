from django.db import models
from django.contrib.auth.models import User 
from phonenumber_field.modelfields import PhoneNumberField
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    auth0_user_id = models.CharField(max_length=100, unique=True)  # maps to Auth0 user_id (sub)
    picture = models.URLField(blank=True, null=True)
    phone = PhoneNumberField(blank=True)
    address = models.CharField(blank=True)
    pincode = models.CharField(blank=True)
    
    def __str__(self):
        return self.user.username
