from django.contrib import admin
from .models import UserAccount, Profile

class UserAdmin(admin.ModelAdmin):
    empty_value_display = '-empty-'

class ProfileAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(UserAccount, UserAdmin)
admin.site.register(Profile, ProfileAdmin)