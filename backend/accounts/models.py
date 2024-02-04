from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

from workspaces.models import Workspace

from .utils import get_gravatar


# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if not first_name or not last_name:
            raise ValueError('Users must have names')

        email = self.normalize_email(email).lower()

        user = self.model(
            first_name=first_name,
            last_name=last_name, 
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password=None):

        user = self.create_user(
            first_name,
            last_name,
            email,
            password=password,
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255,)
    last_name = models.CharField(max_length=255,)
    email = models.EmailField(unique=True, max_length=255,)
    avatar = models.URLField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True,)
    is_staff = models.BooleanField(default=False,)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',]

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField('UserAccount', on_delete=models.CASCADE, related_name='profile', blank=True)
    profession = models.CharField(max_length=255, blank=True)
    skills = models.TextField(help_text="Comma Seperated value",blank=True)
    bio = models.TextField(blank=True)
    github = models.URLField(max_length=255, blank=True)
    youtube = models.URLField(max_length=255, blank=True)
    twitter = models.URLField(max_length=255, blank=True)
    facebook = models.URLField(max_length=255, blank=True)
    linkedin = models.URLField(max_length=255, blank=True)
    instagram = models.URLField(max_length=255, blank=True)
    workspaces = models.ManyToManyField(Workspace, blank=True)

    def __str__(self):
        return self.user.name