from django.db import models
from accounts.models import UserAccount
from workspaces.models import Workspace

# Create your models here.
class Task(models.Model):
    class Priorities(models.TextChoices):
        LOW = 'Low'
        NORMAL = 'Normal'
        HIGH = 'High'
        URGENT = 'Urgent'

    title = models.CharField(max_length=200)
    creator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='Tasks')
    description = models.TextField(blank=True)
    # category = models.CharField(max_length=200)
    priority = models.CharField(max_length=50,
                                choices=Priorities.choices,
                                default=Priorities.NORMAL)
    assigned_to = models.OneToOneField(UserAccount, on_delete=models.DO_NOTHING, blank=True, related_name='assigned_to')
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    due_date = models.DateTimeField(blank=True)
    is_private = models.BooleanField(default=True)

    def __str__(self):
        return self.title