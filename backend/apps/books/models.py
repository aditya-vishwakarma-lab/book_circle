from django.db import models
from apps.users.models import UserProfile
class Book(models.Model):
    class Condition(models.IntegerChoices):
        EXCELLENT = 1
        FAIR = 2

    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=20, blank=True, null=True)
    genre = models.CharField(max_length=100)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True)
    condition = models.IntegerField(choices=Condition.choices, default=Condition.FAIR)

    def __str__(self):
        return self.title
    
    @property
    def is_available(self):
        active_requests = self.borrow_requests.filter(status='accepted')
        return not active_requests.exists()
