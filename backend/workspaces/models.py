from django.db import models


# Create your models here
class Workspace(models.Model):
    title = models.CharField(max_length=200, unique=True) 
    description = models.TextField(blank=True)
    company = models.CharField(max_length=255, blank=True)
    website = models.URLField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    creator = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    categories = models.CharField(help_text="Comma Seperated value", max_length=500)
    is_archived = models.BooleanField(default=False, blank=True)

