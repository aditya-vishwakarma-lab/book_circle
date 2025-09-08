from django.db import models
from apps.books.models import Book
from apps.users.models import UserProfile

# Create your models here.
class BorrowRequest(models.Model):
    class Status(models.IntegerChoices):
        PENDING = 1
        ACCEPTED = 2
        REJECTED = 3
        RETURNED = 4
        CANCELLED = 5

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='borrow_requests')
    borrower = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='borrow_requests')
    lender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='lend_requests')
    status = models.IntegerField(choices= Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"BorrowRequest({self.book.title}) from {self.borrower} to {self.lender} - {self.status}"