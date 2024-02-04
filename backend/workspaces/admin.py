from django.contrib import admin
from .models import Workspace

class WorkspaceAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(Workspace, WorkspaceAdmin)